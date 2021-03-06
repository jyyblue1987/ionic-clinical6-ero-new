import { COUNTRIES, STATE } from '../../flow_process/flow_inputs/single_choice/location-list';
export const PATIENT_PROFILE_FORM = {
    'id': 'patient-profile',
    'title': 'User Profile',
    'toolbar': 'Patient Profile',
    'content_type': 'profile_edit_page',
    'image': null,
    'inputs': [
        {
            'id': 'username',
            'storage_attribute': 'username',
            'title': 'ID',
            'body': '',
            'question_type': 'input',
            'style': 'text',
            'required': false,
            'validation_expression': null,
            'validation_details': null,
            'instructions': '',
            'choice_list': [],
            'locked': true,
            'max': null,
            'min': null,
            'max_label': '',
            'min_label': '',
            'interval': null,
            'labels': []
        },
        {
            'id': 'first_name',
            'storage_attribute': 'first_name',
            'title': 'First Name',
            'body': null,
            'question_type': 'input',
            'style': 'text',
            'required': true,
            'validation_expression': null,
            'validation_details': null,
            'instructions': null,
            'choice_list': [],
            'locked': null,
            'max': null,
            'min': null,
            'max_label': null,
            'min_label': null,
            'interval': null,
            'labels': []
        },
        {
            'id': 'last_name',
            'storage_attribute': 'last_name',
            'title': 'Last Name',
            'body': null,
            'question_type': 'input',
            'style': 'text',
            'required': true,
            'validation_expression': null,
            'validation_details': null,
            'instructions': null,
            'choice_list': [],
            'locked': null,
            'max': null,
            'min': null,
            'max_label': null,
            'min_label': null,
            'interval': null,
            'labels': []
        },
        {
            'id': 'street',
            'storage_attribute': 'street',
            'title': 'Street Address',
            'body': null,
            'question_type': 'input',
            'style': 'text',
            'required': true,
            'validation_expression': null,
            'validation_details': null,
            'instructions': null,
            'choice_list': [],
            'locked': null,
            'max': null,
            'min': null,
            'max_label': null,
            'min_label': null,
            'interval': null,
            'labels': []
        },
        {
            'id': 'city',
            'storage_attribute': 'city',
            'title': 'City',
            'body': null,
            'question_type': 'input',
            'style': 'text',
            'required': true,
            'validation_expression': null,
            'validation_details': null,
            'instructions': null,
            'choice_list': [],
            'locked': null,
            'max': null,
            'min': null,
            'max_label': null,
            'min_label': null,
            'interval': null,
            'labels': []
        },
        {
            'id': 'state',
            'storage_attribute': 'state',
            'title': 'State',
            'body': null,
            'question_type': 'single_choice',
            'list': 'USA',
            'style': 'location',
            'required': false,
            'validation_expression': null,
            'validation_details': null,
            'instructions': null,
            'choice_list': STATE,
            'locked': null,
            'max': null,
            'min': null,
            'max_label': null,
            'min_label': null,
            'interval': null,
            'labels': []
        },
        {
            'id': 'zip_code',
            'storage_attribute': 'zip_code',
            'title': 'Postal Code',
            'body': null,
            'question_type': 'input',
            'style': 'zip_code',
            'required': true,
            'validation_expression': null,
            'validation_details': null,
            'instructions': null,
            'choice_list': [],
            'locked': null,
            'max': null,
            'min': null,
            'max_label': null,
            'min_label': null,
            'interval': null,
            'labels': []
        },
        {
            'id': 'country',
            'storage_attribute': 'country',
            'title': 'Country',
            'body': null,
            'question_type': 'single_choice',
            'style': 'location',
            'required': true,
            'validation_expression': null,
            'validation_details': null,
            'instructions': null,
            'choice_list': COUNTRIES,
            'locked': null,
            'max': null,
            'min': null,
            'max_label': null,
            'min_label': null,
            'interval': null,
            'labels': []
        },
        {
            'id': 'phone',
            'storage_attribute': 'phone',
            'title': 'Phone Number',
            'body': null,
            'question_type': 'input',
            'style': 'phone_number',
            'required': true,
            'validation_expression': null,
            'validation_details': null,
            'instructions': null,
            'choice_list': [],
            'locked': null,
            'max': null,
            'min': null,
            'max_label': null,
            'min_label': null,
            'interval': null,
            'labels': []
        },
        {
            'id': 'email',
            'storage_attribute': 'email',
            'title': 'Email',
            'body': null,
            'question_type': 'input',
            'style': 'email',
            'required': true,
            'validation_expression': null,
            'validation_details': null,
            'instructions': null,
            'choice_list': [],
            'locked': null,
            'max': null,
            'min': null,
            'max_label': null,
            'min_label': null,
            'interval': null,
            'labels': []
        }
    ],
    'paths': [
        {
            'button_name': 'Done',
            'capture': true,
            'last': true,
            'steps': []
        }
    ]
};
export const COMPANION_PROFILE_FORM = {
    'id': 'companion-profile',
    'title': 'Companion Profile',
    'toolbar': 'Companion Profile',
    'description': '<div>My Profile</div>',
    'content_type': 'companion_edit_page',
    'image': null,
    'inputs': [
        {
            'id': 'patient_id',
            'storage_attribute': 'patient_id',
            'title': 'Patient ID',
            'body': '',
            'question_type': 'input',
            'style': 'text',
            'required': false,
            'validation_expression': null,
            'validation_details': null,
            'instructions': '',
            'choice_list': [],
            'locked': true,
            'max': null,
            'min': null,
            'max_label': '',
            'min_label': '',
            'interval': null,
            'labels': []
        },
        {
            'id': 'first_name',
            'storage_attribute': 'first_name',
            'title': 'First Name',
            'body': null,
            'question_type': 'input',
            'style': 'text',
            'required': true,
            'validation_expression': null,
            'validation_details': null,
            'instructions': null,
            'choice_list': [],
            'locked': null,
            'max': null,
            'min': null,
            'max_label': null,
            'min_label': null,
            'interval': null,
            'labels': []
        },
        {
            'id': 'last_name',
            'storage_attribute': 'last_name',
            'title': 'Last Name',
            'body': null,
            'question_type': 'input',
            'style': 'text',
            'required': true,
            'validation_expression': null,
            'validation_details': null,
            'instructions': null,
            'choice_list': [],
            'locked': null,
            'max': null,
            'min': null,
            'max_label': null,
            'min_label': null,
            'interval': null,
            'labels': []
        },
        {
            'id': 'phone',
            'storage_attribute': 'phone',
            'title': 'Phone Number',
            'body': null,
            'question_type': 'input',
            'style': 'phone_number',
            'required': true,
            'validation_expression': null,
            'validation_details': null,
            'instructions': null,
            'choice_list': [],
            'locked': null,
            'max': null,
            'min': null,
            'max_label': null,
            'min_label': null,
            'interval': null,
            'labels': []
        },
        {
            'id': 'email',
            'storage_attribute': 'email',
            'title': 'Email',
            'body': null,
            'question_type': 'input',
            'style': 'email',
            'required': true,
            'validation_expression': null,
            'validation_details': null,
            'instructions': null,
            'choice_list': [],
            'locked': null,
            'max': null,
            'min': null,
            'max_label': null,
            'min_label': null,
            'interval': null,
            'labels': []
        }
    ],
    'paths': []
};

//# sourceMappingURL=profile.mock.js.map
