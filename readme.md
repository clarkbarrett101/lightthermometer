# Light Thermometer App Source Code
App.js is the mediator, routing to the different pages:
* Driver (the light measuring sequence)
* Light Booth (shows a specific light color, driver goes here when finished)
* Saved Temps (a list of the users saved temperatures)

Kelvin_Table.js has a list of light temperatures and their corresponding RGB values.

Also included is a few TensorFlow.js trained models, that I quickly moved away from as it was too hit or miss compared to reqular feedback loops.