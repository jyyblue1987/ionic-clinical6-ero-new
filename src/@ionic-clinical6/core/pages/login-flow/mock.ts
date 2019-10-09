/* tslint:disable */

import { Flow, FlowStep } from 'clinical6';

/**
 * The Login Flow extends the Flow Model, adds new helper attributes and resets the default values by avoiding to send any transition 
 * and allowing to use mock flows. For making the code more user-friedly and flexible we tried to keep as much as possible the same String values for
 * following properties: id, callback, input.id
 *
 * @extends {FlowModel}
 * Flow Step properties
 * @property {FlowStep} first                           - The first step if the first_step id exists
 * @property {String|Number} first_step                 - The id corresponding to the first step in the flow.
 * @property {String|Number} id                         - The flow id (inherited)
 * @property {String} name                              - The name of the flow  (inherited)
 * @property {Number} total                             - The total number of steps in the flow (inherited)
 * @property {String} separator                         - Adds a 'line' or a 'space' separator between divs. It is valid also for an input to divide
 *                                                        the body(text) from the instructions(text)
 * @property {Object} toolbar                           - Used to set different toolbar layouts
 * @property {String} toolbar.title                     - Uses the toolbar 'title' layout: Center Text Title + Back Arrow  + Back Label 
 * @property {boolean} toolbar.logo                     - Uses the toolbar 'logo' layout: Company Logo centered + back arrow + back Label 
 * @property {Object} alerts                            - Object that maps different popup error or warning to show on the App, using the Alert key
 *                                                        and the title, message and buttons properties to customize the Alert (also works with Translator Service).
 *                                                        Depending of the Alert to show the following default keys must be used:
 *                                                          1. account disabled -> "disabled" key
 *                                                          2. invalid code/email/pin -> "invalid" key
 *                                                          3. pins code mismatch -> "pins_mismatch" key
 *                                                          4. app/device registration error -> "registration" key
 *                                                          5. alert for pin reset -> "reset_pin" key
 * @property {String} input.id                          - The id corresponding to the input. Depending of the page to show the following default values must be used:
 *                                                          1. "check-email" screen -> "email" id for email form
 *                                                          2. "check-code" screen -> "code" id for verification-code form
 *                                                          3. "check-pin" screen -> "email_sent" id for pin/password form
 *                                                          4. "forgot-pin" screen -> "email_sent" id for email form (forgot pin case)
 *                                                          5. "reset-pin" screen -> "activation_code" id for activation-code form (forgot pin case)
 *                                                          6. "reset-pin" screen -> "reset_pin" id for pin form (forgot pin case)
 *                                                          7. "reset-pin" screen -> "confirm_reset_pin" id for confirm-pin form (forgot pin case)
 *                                                          8. "create-pin" screen -> "new_pin" id for pin form (create pin case)
 *                                                          9. "create-pin" screen -> "confirm_new_pin" id for confirm-pin form (create pin case)
 * @property {String} input.question_type               - The question_type corresponding to the input. Depending of the form to show the following default values must be used:
 *                                                          1. email form -> "email" question_type-
 *                                                          2. pin/password form -> "pin" question_type
 *                                                          3. code form -> "code" question_type
 * @property {String} input.style                       - The style corresponding to the input. Depending of the form to show the following default values must be used:
 *                                                          1. email form -> "email" style
 *                                                          1. pin/code form -> "password" style
 * @property {Object} input.validation_details          - Any further validation information
 * @property {Number} input.validation_details.min      - Number of minimum values to use. Default to 6 for a pin/password input and 
 *                                                        8 for a verification/activation-code input
 * @property {Number} input.validation_details.max      - Number of maximum values to use. Default to 6 for a pin/password input and 
 *                                                        8 for a verification/activation-code input
 * @property {Object} input.attribute                   - Custom attributes for UI improvements
 * @property {String} input.attribute.separator         - Adds a 'line' or a 'space' separator between divs (for input form)
 * @property {String} input.attribute.link_button       - Used to add a link button under the input form. It must be equal to the button_name property
 * 
 * Flow Step - Button properties
 * @property {boolean} capture                          - It must be false to avoid transition errors
 * @property {String} callback                          - Callback to use if the button is clicked. A custom callback can be implemented extending the LoginFlowPage and
 *                                                        using any string other than the following:
 *                                                          1. "checkEmail" -> Callback to check registration status of the user
 *                                                          2. "checkCode" -> Callback to check the verification code and call the 'checkCodeSuccess' callback in case of success
 *                                                          3. "checkPin" -> Callback to start the login procedure and call the 'loginSuccess' callback in case of success
 *                                                          4. "forgotPin" -> Callback to start the pin/password reset procedure
 *                                                          5. "resetPin" -> Callback to reset the pin/password and call the 'loginSuccess' callback in case of success
 *                                                          6. "createPin" -> Callback to create a new Pin and call the 'createPinSuccess' callback in case of success
 * @property {boolean} input.attribute.is_link_button   - Necessary to understand that the button is a link and not a footer button or a special button
 * 
 * @example <caption>Login Flow Step example</caption>
 * {
 *   'id': 'check-pin',
 *   'title': 'Enter your 6 digit PIN',
 *   'description': null,
 *   'rich_description': null,
 *   'separator': null, 
 *   'content_type': 'check_pin',
 *   'image': null,
 *   'toolbar': {
 *     'logo': null,
 *     'title': 'Log In'
 *   },
 *   'alerts': {
 *     'reset_pin': {
 *         'title': 'Reset Password',
 *         'message': 'Would you like to reset <br>your 6 digit Password?',
 *         'buttons': [
 *           {
 *             'text': 'Cancel',
 *             'handler': false
 *           },
 *           {
 *             'text': 'OK',
 *             'handler': true
 *           }
 *         ]
 *     },
 *     'invalid': {
 *         'title': 'Invalid PIN',
 *         'message': 'Please check your credentials and try again',
 *         'buttons': null
 *     },
 *     'registration': {
 *         'title': 'Application error',
 *         'message': 'Something went wrong, please reinstall your app.',
 *         'buttons': null
 *     }
 *   },
 *   'inputs': [
 *       {
 *         'id': 'pin',
 *         'storage_attribute': 'pin',
 *         'title': 'Enter your 6 digit PIN',
 *         'body': null,
 *         'question_type': 'pin',
 *         'style': 'password', 
 *         'required': true,
 *         'validation_details': { min: 6, max: 6},
 *         'instructions': null,
 *         'choice_list': [],
 *         'locked': null,
 *         'attribute' : {
 *           'link_button': 'Forgot Pin',
 *           'separator': 'space'
 *         }                  
 *       }
 *     ],
 *     'paths': [
 *         {
 *           'button_name': 'Forgot Pin',
 *           'callback': null,
 *           'capture': false,
 *           'last': true,
 *           'is_link_button': true,
 *           'steps': [
 *               {
 *                   'step': 'forgot-pin',
 *                   'conditions': []
 *               }
 *           ]
 *         },
 *         {
 *           'button_name': 'LOG IN',
 *           'callback': 'checkPin',
 *           'capture': false,
 *           'last': false,
 *           'steps': [
 *             {
 *               'step': 'forgot-pin',
 *               'conditions': [
 *                   {criteria: "failed_logins", operator: ">=", value: "3", source: "profile"}
 *               ]
 *             },
 *             {
 *               'step': null,
 *               'conditions': [
 *                   {criteria: "failed_logins", operator: "<", value: "3", source: "profile"}
 *               ]
 *             }
 *           ]
 *         }
 *     ]
 * }
 **/
class LoginFlow extends Flow{
    constructor(response = {}) {
        super(response);
        this.disableTransitions();
    }
    /**
     * This allows to use the Login Flow as a mock flow, disabling any transition
     */
    disableTransitions() {
      this['status'] = null;
      this['transition'] = null;
      this['complete'] = () => {
        return new Promise((resolve, reject) => {
            this['reset']();
            resolve('flow completed');
        });
      };
    }

    /**
     * @param {String} id    - Flow Step id
     * @return {FlowStep}    - Retrieves the Flow Step with a specific "id" by filtering the Flow Steps list of the Login Flow
     * 
     * @example 
     * let flow = new LoginFlow({...});
     * let step = flow.getStepbyId('create-pin');
    **/
    getStepbyId(id) {
        return this && (this['steps'].find(step => {return (step.id == id)}) || this['first']);
    }

    /**
     * Sets the Flow Step with a specific "id" as first Flow Step of the Login Flow
     * @param {String} id    - Flow Step id
     * 
     * @example 
     * let flow = new LoginFlow({...});
     * let step = flow.setFirstStep('create-pin');
    **/
    setFirstStep(id) {
        this && (this['first_step'] = id) && (this['first'] = this.getStepbyId(id));
    }
}

/**
 * @type {LoginFlow} loginFlow -The following loginFlow can be imported  in any Project to build the Login Section
 * 
 * NOTE: the default properties flow_process_id, input.validation_expression, input.max, input.max_label, input.min, input.min_label,
 *       input.labels[], input.interval, etc. are unnecessary so will be omitted.
**/
const loginFlow = new LoginFlow({
  "id": "login-flow",
    "steps": [
        {
          'id': 'check-email',
          'title': null,
          'description': null,
          'rich_description': null,
          'separator': null,
          'content_type': 'check_email',
          'image': null,
          'toolbar': {
            'logo': false,
            'title': 'Log In'
          },
          'alerts': {
              'disabled': {
                  'title': 'Account Disabled',
                  'message': 'Your account has been disabled. Please contact your System Administrator.',
                  'buttons': [
                    {
                      'text': null,
                      'handler': null
                    }
                  ]
              },
              'invalid': {
                  'title': 'Invalid Email',
                  'message': 'The entered Email is not valid. Please verify and try again.',
                  'buttons': [
                    {
                      'text': null,
                      'handler': null
                    }
                  ]
              },
              'registration': {
                  'title': 'App Registration Error',
                  'message': 'Unable to register the application. Please get in touch with your support contact, and try again.',
                  'buttons': [
                    {
                      'text': null,
                      'handler': null
                    }
                  ]
              }
          },
          'inputs': [
            {
              'id': 'email',
              'storage_attribute': 'email',
              'title': 'Email Address',
              'body': 'Enter Your Previously Registered Email Address.',
              'question_type': 'email',
              'style': 'email', 
              'required': true,
              'validation_details': null,
              'instructions': null,
              'choice_list': [],
              'locked': null,
              'attribute' : {
                'separator': 'space'
              }  
            }
          ],
          'paths': [
            {
              'button_name': 'NEXT',
              'capture': false,
              'callback': 'checkEmail',
              'last': false,
              'steps': [
                  {
                    'step': 'check-pin',
                    'conditions': [
                        {criteria: "check-email", operator: "=", value: "pin", source: "profile"}
                    ]
                  },
                  {
                    'step': 'check-code',
                    'conditions': [
                        {criteria: "check-email", operator: "=", value: "code", source: "profile"}
                    ]
                  }
              ]
            }
          ]
        },
        {
          'id': 'check-code',
          'title': null,
          'description': null,
          'rich_description': null,
          'separator': null, 
          'content_type': 'check_code',
          'image': null,
          'toolbar': {
            'logo': true,
            'title': '',
          },
          'alerts': {
            'invalid': {
                'title': 'Invalid Verification Code',
                'message': 'Please Verify Your Code and try again.',
                'buttons': null
            }
          },
          'inputs': [
            {
              'id': 'code',
              'storage_attribute': 'code',
              'title': 'Enter your Verification',
              'body': 'Enter your Verification Code',
              'question_type': 'code',
              'style': 'password', 
              'required': true,
              'validation_details': { min: 8, max: 8},
              'instructions': 'Enter the 8 digit Verification Code we sent to your registered email',
              'choice_list': [],
              'locked': null,
              'attribute' : {
                'separator': 'line'
              }   
            }
          ],
          'paths': [
            {
              'button_name': 'UNLOCK APP',
              'capture': false,
              'callback': 'checkCode',
              'last': true,
              'steps': [
                {
                  'step': null,
                  'conditions': []
                }
              ]
            }
          ]
        },
        {
          'id': 'check-pin',
          'title': 'Enter your 6 digit PIN',
          'description': null,
          'rich_description': null,
          'separator': null, 
          'content_type': 'check_pin',
          'image': null,
          'toolbar': {
            'logo': null,
            'title': 'Log In'
          },
          'alerts': {
            'reset_pin': {
              'title': 'Reset Password',
              'message': 'Would you like to reset <br>your 6 digit Password?',
              'buttons': [
                {
                  'text': 'Cancel',
                  'handler': false
                },
                {
                  'text': 'OK',
                  'handler': true
                }
              ]
            },
            'invalid': {
                'title': 'Invalid PIN',
                'message': 'Please check your credentials and try again',
                'buttons': null
            },
            'registration': {
                'title': 'Application error',
                'message': 'Something went wrong, please reinstall your app.',
                'buttons': null
            }
          },
          'inputs': [
              {
                'id': 'pin',
                'storage_attribute': 'pin',
                'title': 'Enter your 6 digit PIN',
                'body': null,
                'question_type': 'pin',
                'style': 'password', 
                'required': true,
                'validation_details': { min: 6, max: 6},
                'instructions': null,
                'choice_list': [],
                'locked': null,
                'attribute' : {
                  'link_button': 'Forgot Pin',
                  'separator': 'space'
                }                  
              }
            ],
            'paths': [
                {
                  'button_name': 'Forgot Pin',
                  'callback': null,
                  'capture': false,
                  'last': true,
                  'is_link_button': true,
                  'steps': [
                      {
                          'step': 'forgot-pin',
                          'conditions': []
                      }
                  ]
                },
                {
                  'button_name': 'LOG IN',
                  'callback': 'checkPin',
                  'capture': false,
                  'last': false,
                  'steps': [
                    {
                      'step': 'forgot-pin',
                      'conditions': [
                          {criteria: "failed_logins", operator: ">=", value: "3", source: "profile"}
                      ]
                    },
                    {
                      'step': null,
                      'conditions': [
                          {criteria: "failed_logins", operator: "<", value: "3", source: "profile"}
                      ]
                    }
                  ]
                }
              ]
            },
            {
              'id': 'forgot-pin',
              'title': 'Enter Your Email Address',
              'description': 'We can send an activation code to your email to reset your PIN.<br>Please enter your email address and tap the send button below.',
              'rich_description': null,
              'separator': null,
              'content_type': 'check_email',
              'image': null,
              'toolbar': {
                'logo': null,
                'title': 'Log In'
              },
              'alerts': {
                'invalid': {
                    'title': 'Invalid Email',
                    'message': 'The entered Email is not valid. Please verify and try again.',
                    'buttons': null
                },
                'registration': {
                    'title': 'App Registration Error',
                    'message': 'Unable to register the application. Please get in touch with your support contact, and try again.',
                    'buttons': null
                }
              },
              'inputs': [
                {
                  'id': 'email_sent',
                  'storage_attribute': 'email_sent',
                  'title': 'Email Address',
                  'body': null,
                  'question_type': 'email',
                  'style': 'email', 
                  'required': true,
                  'validation_details': null,
                  'instructions': null,
                  'choice_list': [],
                  'locked': null,
                  'attribute' : {
                    'separator': 'space'
                  }  
                }
              ],
              'paths': [
                {
                  'button_name': 'SEND',
                  'capture': false,
                  'callback': 'forgotPin',
                  'last': false,
                  'steps': [
                      {
                        'step': 'email-sent',
                        'conditions': []
                      }
                  ]
                }
              ]
            },
            {
              'id': 'email-sent',
              'title': 'Please Check Your Email',
              'description': 'If the email entered is a valid registerd email, a PIN/Password reset code will be sent to you shortly.',
              'rich_description': null,
              'separator': null,
              'content_type': 'check_email',
              'image': null,
              'toolbar': {
                'logo': null,
                'title': 'Log In'
              },
              'alerts': null,
              'inputs': [],
              'paths': [
                {
                  'button_name': 'CONTINUE',
                  'capture': false,
                  'callback': null,
                  'last': false,
                  'steps': [
                      {
                        'step': 'reset-pin',
                        'conditions': []
                      }
                  ]
                }
              ]
            },
            {
              'id': 'reset-pin',
              'title': null,
              'description': null,
              'rich_description': null,
              'separator': 'space', 
              'content_type': 'reset_pin',
              'image': null,
              'toolbar': {
                'logo': null,
                'title': 'Log In'
              },
              'alerts': {
                'invalid': {
                  'title': 'Invalid Activation Code',
                  'message': 'An invalid activation code has been entered. Please try again.',
                  'buttons': null
                },
                'pins_mismatch': {
                    'title': 'PIN codes Mismatch',
                    'message': 'PIN codes do not match, please verify your input.',
                    'buttons': null
                },
                'registration': {
                    'title': 'Device Registration Error',
                    'message': 'Unable to Reset Password. Please get in touch with your support contact, and try again.',
                    'buttons': null
                }
              },
              'inputs': [
                {
                  'id': 'activation_code',
                  'storage_attribute': 'activation_code',
                  'title': 'Activation Code',
                  'body': 'Enter your Activation Code',
                  'question_type': 'code',
                  'style': 'password', 
                  'required': true,
                  'validation_details': { min: 8, max: 8},
                  'instructions': null,
                  'choice_list': [],
                  'locked': null,
                  'attribute' : {
                      'link_button': 'If you have not received your activation code tap here to re-enter your email.',
                      'separator': 'space'
                  }
                },
                {
                    'id': 'reset_pin',
                    'storage_attribute': 'reset_pin',
                    'title': 'Create A New 6 Digit PIN',
                    'body': 'Create A New 6 Digit PIN',
                    'question_type': 'pin',
                    'style': 'password', 
                    'required': true,
                    'validation_details': { min: 6, max: 6},
                    'instructions': 'Please be sure to remember this information. You will be asked to enter your PIN next time you enter the app.',
                    'choice_list': [],
                    'locked': null,
                    'attribute' : {
                      'separator': 'line'
                    }
                  },
                  {
                    'id': 'confirm_reset_pin',
                    'storage_attribute': 'confirm_reset_pin',
                    'title': 'Enter your 6 digit PIN',
                    'body': null,
                    'question_type': 'pin',
                    'style': 'password', 
                    'required': true,
                    'validation_details': { min: 6, max: 6},
                    'instructions': null,
                    'choice_list': [],
                    'locked': null,
                  }
              ],
              'paths': [
                {
                  'button_name': 'If you have not received your activation code tap here to re-enter your email.',
                  'callback': null,
                  'capture': false,
                  'last': false,
                  'is_link_button': true,
                  'steps': [
                      {
                          'step': 'check-email',
                          'conditions': []
                      }
                  ]
                },
                {
                  'button_name': 'LOG IN',
                  'callback': 'resetPin',
                  'capture': false,
                  'color': 'cyan',
                  'last': true,
                  'steps': [
                      {
                        'step': null,
                        'conditions': []
                      }
                  ]
                }
              ]
            },
            {
              'id': 'create-pin',
              'title': null,
              'description': null,
              'rich_description': null,
              'separator': null, 
              'content_type': 'create_pin',
              'image': null,
              'toolbar': {
                'logo': null,
                'title': 'Log In'
              },
              'alerts': {
                'pins_mismatch': {
                  'title': 'PIN codes Mismatch',
                  'message': 'PIN codes do not match, please verify your input.',
                  'buttons': null
                },
                'invalid': {
                  'title': 'Invalid PIN',
                  'message': 'Please check your credentials and try again',
                  'buttons': null
                }
              },
              'inputs': [
                {
                  'id': 'new_pin',
                  'storage_attribute': 'new_pin',
                  'title': 'Enter a 6 digit PIN',
                  'body': 'Create a 6 digit PIN',
                  'question_type': 'pin',
                  'style': 'password', 
                  'required': true,
                  'validation_details': { min: 6, max: 6},
                  'instructions': 'Please be sure to remember this information. You will be asked to enter this information the next time you enter the app.',
                  'choice_list': [],
                  'locked': null,
                  'attribute' : {
                    'separator': 'line'
                  }
                },
                {
                  'id': 'confirm_new_pin',
                  'storage_attribute': 'confirm_new_pin',
                  'title': 'Confirm your 6 digit PIN',
                  'body': null,
                  'question_type': 'pin',
                  'style': 'password', 
                  'required': true,
                  'validation_details': { min: 6, max: 6},
                  'instructions': null,
                  'choice_list': [],
                  'locked': null,
                }
              ],
              'paths': [
                {
                  'button_name': 'UNLOCK APP',
                  'callback': 'createPin',
                  'capture': false,
                  'last': true,
                  'steps': []
                }
              ]
          }
    ],
    "name": "Login Flow",
    "first_step": 'check-email',
    "total": 7
});

export {loginFlow, LoginFlow};