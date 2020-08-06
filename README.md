# What is this?

This script sends a **new response on your google forms** to **your slack channel**.

# How it looks like?

I'll show you results.

<img src="https://github.com/roeniss/google-forms-response-to-slack/blob/master/imgs/1%20create%20google%20forms.png?raw=true" witdh="500px" alt="google forms example"/>

<br />

<br />

<img src="https://github.com/roeniss/google-forms-response-to-slack/blob/master/imgs/6%20notification%20example.png?raw=true" width="300px" alt="slack notification example" />

<br />

<br />

<img src="https://github.com/roeniss/google-forms-response-to-slack/blob/master/imgs/7%20slack%20message%20example.png?raw=true" width="500px" alt="slack message example"/>

# How can I use this?

0. You must have (1) google account, (2) slack hook url that connects to a specific channel.

1. Make a Google Forms as shown above.

2. Make a Google Spreadsheets that connects to 1.

<img src="https://github.com/roeniss/google-forms-response-to-slack/blob/master/imgs/2%20collect%20response%20using%20google%20spreadsheets.png?raw=true" witdh="300px" alt="collect response using google spreadsheets">

3. Go to Scripts Editor from 2.

<img src="https://github.com/roeniss/google-forms-response-to-slack/blob/master/imgs/3%20goto%20scripts%20editor%20from%20spreadsheets.png?raw=true" width="500px" alt="goto scripts editor from spreadsheets">

4. In Editor, copy and paste `script.js`from this github. Make sure you edit Global Configuration section in the code.

5. Add trigger. In below screenshots, for not Korean, left 3rd is "choose event source: from spreadsheets" left 4th is ~~"choose event type: when changed",~~  **check 'on form submit'!** and right 1st is "trigger fail alert settings: immediately".

<img src="https://github.com/roeniss/google-forms-response-to-slack/blob/master/imgs/4%20add%20trigger%20after%20editing%20scripts.png?raw=true" width="500px" alt="add trigger after editing scripts">

you can find how to add tigger on here : https://stackoverflow.com/a/57874051/8556340

6. Before go furthur, you should run `sendNewGoogleFormsResponseToSlack()` in Script Editor because you need to authorize your script to make sure your script get rights to see your own spreadsheet. THIS IS GOOGLE SYSTEM

7. Test it by answering your forms. You will get notification and message of it. <img src="https://github.com/roeniss/google-forms-response-to-slack/blob/master/imgs/5%20answer%20forms.png?raw=true" width="500px" alt="answer forms">

# How it works?

When new response came in, connected spreadsheet is 'changed' because new response get written on it. It triggers my script by a set trigger. Then the script fetch hooks with spreadsheet body (as awscome cool string format). That's it.

# "I can't follow up. It's too hard!"

If you have a trouble on this, please leave a issue. I will respond to it as soon as possible! :)
