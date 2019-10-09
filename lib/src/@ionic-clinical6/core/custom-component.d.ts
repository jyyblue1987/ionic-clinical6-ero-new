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
export declare function CustomComponent(annotation: any): (target: Function) => void;
