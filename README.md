# Pop & Drop
A lightweight pop-up and drop-down purely java-script library

## Pop-ups
![Pop-up example](./res/pop.gif)

```
let popup = new Pop("Header Text", "Inner Content");
popup.show(); // Display the Popup
popup.close(); // Used to pragmatically close the popup
```

## Drop-downs
![Drop-down example](./res/out.gif)

```
let dropdown = new Drop(parent, width, height, color, unit);
dropdown.setContent("Hello There!");
dropdown.drop(); // Drop the element into view
dropdown.rise(); // Hide the element again
```
