# Server for the CloseRocket FE task

This is a very rudimentary server for use with the task for applicants to CloseRocket's FE team.

### You can find the [assignment description here](https://docs.google.com/document/d/1hX5Azk_Cdl8Bd9qsO6V9fg4sVPRy6jDev1E4MJNKqjU/view)


## Installation and running the server

* Install Node v20
* Run `yarn install`
* Run `yarn start`

Your server will be available at `http://localhost:4242`.


## GET `http://localhost:4242/reading?start=<<UNIX TIME>>`

* Returns up to a 100 readings, starting at a unix time that is greater than the `start` parameter. If there are more than 100 readings, the endpoint still only returns 100. The rows are in order, with the first row returned being the oldest reading.
* If there are no readings more recent than the `start` value, an empty response is returned (with a HTTP code of 204).
* Returns readings from the sensors as rows in plaintext csv.
* Row format is as follows:
`<<UNIX TIME>>,<<SENSOR NAME>>,<<READING>>`
* In our case, the sensors are named `temp1` for the temperature sensor and `hum1` for the humidity sensor.
* Example value:
```csv
1704290406852,temp1,3.19
1704290466882,temp1,3.92
1704290526872,hum1,80.46
1704290526883,temp1,3.17
1704290586910,temp1,4.25
1704290646901,hum1,80.43
1704290646910,temp1,-0.7
1704290706939,temp1,4.01
1704290766930,hum1,78.89
1704290766939,temp1,5.5
1704290826968,temp1,0.94
```
