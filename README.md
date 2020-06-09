# CS 100 Programming Project - Productivity Manager

##### Group Members
Rayyaan Mustafa (<rmust001@ucr.edu>)  
Anthony Gao (<agao011@ucr.edu>)  
Kevin Nguyen (<knguy523@ucr.edu>)  

---

##### What app do you plan to work on? 
We plan to create an app that will make time management a far easier task for everyone by allowing users to log what they do with their time and providing analytics to them on how they've been spending their time.

---

##### Why is it important and interesting?
As college students, we find ourselves always at a strain for time. Being able to manage our time better is something many of us focus on daily. Using the app, users will be able to better understand their habits and figure out how they can use their time better.

---

##### What language/tools/technology you plan to use?
    HTML - used to make raw website  
    CSS - used to customize website  
    JS - used to add interactivty to website  
    Chart.js - used for visualization  
    localStorage to store user data  
    
---

##### What will be the input/output of your project?
Input will be data about the user's daily activities, inputted directly by the user two main forms of output:
- Personalized graphs that will visualize to a user how their time is being spent
- Tips to user on how to boost productivity based on their habits and pre-made templates

---

#### Future Improvements
- Have user accounts
- Save user data in a database to allow access across multiple devices
- Simplify input process and and make pages more visually appealing


# Design Patterns

## Composite Pattern
![Composite Pattern](/DesignPatternPictures/CompositePattern.png)
We used the composite design pattern because we wanted the functionality of adding activities to days and having the display function be different for activities, days, weeks, months, and years. They also each have a has-a relationship with each other, so composite design pattern is ideal.

---

## Strategy Pattern
![Strategy Pattern](/DesignPatternPictures/StrategyPattern.png)
Depending on the user inputted data, the insights strategy pattern will produce suggestions that the user may take. Crossing set thresholds may be a trigger to suggest a break, reduction, or increase of that activity. Currently, it consists of 5 concrete strategies that can display the triggered insight.

---

## Decorator Pattern
![Decorator Pattern](/DesignPatternPictures/DecoratorPatternUpdate.png)
The decorator design pattern allows us to add new functioniality to already existing objects. With this pattern we have Chart as our abstract component. Chart has three concrete components namely, Polar, Pie, and Bar chart. Chart Decorator is our abstract decorator and it has two concrecte decorators namely, Default Colors Decorator and Dark Colors Decorator. This design pattern allows us the functionality to alter the color scheme of our charts during run-time.

---

# Input/Output
## Input
![input](/images/input.png)
The page takes input from the user through the form and interactive calendar on the Calendar page.
## Output
![output](/images/output1.png)
A chart is drawn on a canvas at the click of a button with Charts.js.
![output](/images/ouput2.png)
Insights are generated in javascript and added to the html on click.

# How to run the code

To run the application simply download the associated files and open the index.html file in your browser of choice. Best compatibility in the chrome web browser.
The default date is set to the current date. Users can and should select a new one via the calendar on the right, if filling out the form for a different day. Click on the other tabs to use their associated features by clicking on the buttons after filling out the calendar page.
