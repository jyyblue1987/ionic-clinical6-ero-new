import { Component } from '@angular/core';
import 'reflect-metadata';
/**
 * This custom component allows you to extend a parent
 * component without having to provide a custom annotation, leave blank
 * if you will use the parent config.
 *
 * @param annotation the annotation object for the child component,
 * if you are using this you can override any of the attributes of the parent
 * component.
 */
export function CustomComponent(annotation) {
    const c = class C {
    };
    Component({})(c);
    // const DecoratorFactory = Object.getPrototypeOf(Reflect.getOwnMetadata('annotations', c)[0]);
    const DecoratorFactory = Object.getPrototypeOf(c['__annotations__'][0]);
    Object.assign(Object.create(DecoratorFactory), annotation);
    return function (target) {
        var parentTarget = Object.getPrototypeOf(target.prototype).constructor;
        // var parentAnnotations = Reflect.getMetadata('annotations', parentTarget);
        var parentAnnotations = parentTarget['__annotations__'];
        var parentAnnotation = parentAnnotations[0];
        Object.keys(parentAnnotation).forEach(key => {
            if (parentAnnotation[key] != null) {
                if (typeof annotation[key] === 'function') {
                    annotation[key] = annotation[key].call(this, parentAnnotation[key]);
                }
                else if (annotation[key] == null) {
                    // if the annotation is present on the child component, use it
                    annotation[key] = parentAnnotation[key];
                }
            }
        });
        var metadata = new Component(annotation);
        Reflect.defineMetadata('annotations', [metadata], target);
    };
}

//# sourceMappingURL=custom-component.js.map
