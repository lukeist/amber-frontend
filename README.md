# Amber Kinetics Inc UI/UX Engineer Assessment

Link to project (hosted by AWS Amplify) https://main.d1w65l1v6fcr36.amplifyapp.com/

Link to the frontend's repo: https://github.com/hiluan/amber-frontend/

Link to the backend's repo: https://github.com/hiluan/amber-backend/

https://user-images.githubusercontent.com/76276426/204114364-f6e88bef-30a9-4481-a1aa-8a3b0cb5f5d3.mp4

## How It's Made:

**Tech used:** React.js, Redux.js (Redux Toolkit), Node.js, Express.js, Framer Motion, React-Icons, Cors, DotEnv, MongoDB, Heroku, AWS Amplify.

1. **Frontend** with React.js, Redux.js (Redux Toolkit), Framer Motion, React-Icons, AWS Amplify:

- React.js: Front-point App built to display the provided sample data following the prompt.
- Redux.js: This library is used for managing and centralizing the app state per request from the prompt.
- Framer Motion: helps create animated effects.
- AWS Amplify: Amazon cloud service is used for hosting the frontend.

2. **Backend** with Node.js, Express.js, Cors, DotEnv, MongoDB, and Heroku:

- Node.js: End-point App built to connect to our database for reading and updating provided sample data in real-time.
- MongoDB: A cluster and a collection are created in this database service to host the provided sample data and connect it to the Node.js App.
- Heroku: This cloud platform is used for hosting the backend. The free tier ended on Nov 28, 2022.

## How It Works:

1. **Fetching Data with React Hook `useEffect()`**: `App.js`

- **Requirements checked** (1/4): _Fetch the mock data by creating a Node.js or Python endpoint_: The React Hook useEffect() is triggered once the app starts. Keep in mind that we have an empty array at the end for executing useEffect() only once. It then fetches the data from the Node.js endpoint hosted on Heroku.

- **Requirements checked** (2/4): *Implement this feature using React(preferably with Redux)*: After finishing fetching, Redux.js dispatches the data to the global state.

![amber-fetching](https://user-images.githubusercontent.com/76276426/204111006-cc66f08b-dfee-40c8-b73b-cfd9d45d4dad.jpg)

- I used `Set()` during the execution of `useEffect()` to store all values of years from the data for best practices instead of thinking that it has only 2 values of years. It's then converted into an `array`, sorted, and passed down to `Radio` as `props`.

2. **Redux / Redux Toolkit**

- I separated the global states into two slices: - `dbSlice.js` stores the whole data for later use without having to fetch it over and over again whenever I need it.- `recordsSlice.js` stores the values of the current chart and grid.

Responsive design: _View on Ipad mini_

![amber-redux-global-state-before-fetching](https://user-images.githubusercontent.com/76276426/204111360-2703694e-766f-4801-9802-02cd398b9ef1.jpg)
_Two states before finishing fetching_

![amber-redux-global-state-after-fetching](https://user-images.githubusercontent.com/76276426/204111361-c0466b74-7e86-4d0a-bf3b-3338a7423d07.jpg)
_Two states after finishing fetching_

3. **The 'Students' class**: `_getStudents.js`

- The main class in the app provides the right values for the chart and grid.

- `_totalStudent(hash)` gets the total number of students in all or any years.- `_getDecimal(num)` gets decimals for percentage calculation.

- `all()` filters the number of students of all years by course.

- `byCourse(year)` filters the number of students by year and course.

- `byInstructor(year, course)` filters the number of students by year, course, and instructor.

4. **Radio Button Group**: `radio.js`

- `years` from `App.js` are mapped as radio buttons.Anytime a radio button is clicked, it will `dispatch` the required methods of class `Students` with all info of that year to the global state via Redux: `students.byCourse(year)` and `students.byInstructor(year, course)`.

5. **Pie Chart**: `chart.js`

- `Recharts` from React libraries breaks down the number of students by course. It gets info from the `courses` state and displays them on the screen. The user can click on the chart to select a specific course at any time via `handleGrid()`. This method dispatches the required methods of class `Students` to the global state via Redux: `students.byInstructor(year, course)`.

Responsive design: _View on Google Chrome_

![amber-pie-chart-view-on-google-chrome](https://user-images.githubusercontent.com/76276426/204111599-cda1a11e-efaa-46bc-a161-06176b8ae913.jpg)
_Pie Chart_

6. **Data Grid**: `recordLisit.js`

- The grid displays detailed student data for a specific course with alternating background colors for the rows. The grid becomes visible only after the user chooses a course. If the number of students' figures is below average, it'll be in bold.

Responsive design: _View on Iphone 12_

<img src="https://user-images.githubusercontent.com/76276426/204111804-80784bfe-7333-48cc-8b0c-d096fd66cdaf.jpg" width="260">

_Data Grid and Pie Chart_

7. **Responsive, Animations, and Effects**

- While it is fetching the data, a loading animation runs on the screen to let users know that the app is working for them.

- The background has a gradient animated effect to make the app more attractive.

- By applying CSS tricks like using `max-height` to `container` that has auto height, and set `translateX` to chart's positions, I made sure the app flows seamlessly when new objects are added to the view of the user, responsively.

- Framer Motion from React libraries is used to make the appearance of the data grid and the radio button taps are more interesting and attractive.
  The cells of the data grid have the spaces needed to remain in their original form. For example,s when switching from "All" to "2015", the grid stays as it is without having to resize.

- **Requirements checked** (3/4): _The implementation should work for all major browser platforms_: all major browsers were tested.

- **Requirements checked** (4/4): _Implement responsive design and scale for both desktop and mobile browsers_: I broke the views down into 3 CSS files. `480.css` is for screens with widths lower than 480px, `768.css` is for screens from 481px - 768px, and `1200.css` is for screens from 769px to 1200px.

## Optimizations

All methods from class `Students` are O(n) of time complexity since I had to traverse through the whole dataset to get all the info I needed. I used Hashmaps and arrays there to make sure the app run with O(1) of space complexity. Yet the app has O(n) of space complexity due to storing the whole dataset in the global state via Redux. The combination of both is an acceptable performance.

The array `colors` in `chart.js` needs to be a method that automatically generates more colors following the number of years in the dataset.

## Lessons Learned

I shouldn't have shown the younglings at my grandmom's Thanksgiving party some 'awesome color-changing animation' if I wanted to finish the assessment sooner.
