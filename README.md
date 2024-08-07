# toast.js

`toast.js` is a simple JavaScript library for displaying toast notifications on your web page. It allows you to create customizable and responsive toast notifications with different styles and positions.

## Features

- Multiple toast types (default, warning, danger, success, neutral, info, prime)
- Customizable position (top-left, top-center, top-right, bottom-left, bottom-center, bottom-right)
- Customizable timeout for toast auto-dismissal
- Close button and custom buttons
- Responsive and stackable toasts
- Simple and easy to integrate

## Installation

You can directly include the `toast.js` script in your HTML file:

```html
<script src="path/to/toast.js"></script>
```

## Usage

### Basic Usage

To display a toast notification, create a new instance of `slxToast` with the required options:

```javascript
new slxToast({
    message: 'This is a toast notification!',
    type: 'success', // Optional, default is 'default'
    position: 'bottom-right', // Optional, default is 'bottom-right'
    timeout: 5000 // Optional, default is 5000 ms
});
```

### Options

- `message` (string, required): The message to be displayed in the toast.
- `type` (string, optional): The type of the toast. Possible values are `default`, `warning`, `danger`, `success`, `neutral`, `info`, and `prime`. Default is `default`.
- `position` (string, optional): The position of the toast on the screen. Possible values are `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, and `bottom-right`. Default is `bottom-right`.
- `timeout` (number, optional): The time (in milliseconds) after which the toast will auto-dismiss. Default is 5000 ms.
- `closeButton` (boolean, optional): If true, a close button will be displayed on the toast. Default is false.
- `heading` (string, optional): The heading of the toast. Default is no heading.
- `customButtons` (array, optional): An array of custom button objects. Each object should have `text` (string) and `onClick` (function) properties. Default is no custom buttons.

### Example

```javascript
new slxToast({
    message: 'Operation completed successfully!',
    type: 'success',
    position: 'top-right',
    timeout: 3000,
    closeButton: true,
    heading: 'Success',
    customButtons: [
        {
            text: 'Undo',
            onClick: function() {
                console.log('Undo clicked');
            }
        }
    ]
});
```

## Styling

The following CSS classes are used for styling the toast notifications:

- `slxToast-container`: Container for the toasts
- `slxToastParent`: Parent container for the toast notifications
- `slxToastPosition__<position>`: Classes for positioning the toasts
- `slxToast`: Class for individual toasts
- `slxToast-btn--close`: Class for the close button
- `slxToastType__<type>`: Classes for different toast types

The default styles are included in the `toast.js` script. You can override these styles in your own CSS file if needed.

## License

This project is licensed under the MIT License.

## Acknowledgements

This library was inspired by the need for a simple and customizable toast notification system in web applications.

Feel free to contribute or report issues on the project's GitHub repository.

---

With `toast.js`, you can easily add toast notifications to your web application and provide a better user experience with timely and informative messages.