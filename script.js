// ----------------------
//  Global Configuration
// ----------------------

// you can see sheet id on url when you opened a sheet.
const SHEET_ID = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

// you can see log from Google Apps Script console.
const PRINT_LOG = true;

// you should make a webhook url for a specific channel (at least I think so). reference: https://api.slack.com/messaging/webhooks
const slackIncomingWebhookUrl = "https://hooks.slack.com/services/XXXXXXXXX/XXXXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXX";

// looks like you don't have to write your speicific channel name that corresponds to slack hooks's one.
// But if you remove it, you might not able to get desktop notification. I think this is a bug, or just my computer's problem.
// Suggestion : leave it until you have a problem.
const channelName = "YOUR_SLACK_CHANNEL_NAME";

// this will display on notification section only. But if blocks are invalid, this will show up on the given channel as well (I'm not sure. sorry).
// I also use this text as header. you can find it below 'Slack Message Generator' section.
const notificationText = "New Response!";

// Just FYI : row and column number start from 1, not 0.

// ---------------------
//  Entry Point
// ---------------------

function sendNewGoogleFormsResponseToSlack() {
  const qna = getQnA();
  log("qna", qna);

  const blocks = generateSlackMessage(qna);
  log("blocks", blocks);

  const response = notifyToSlack(blocks);
  log("SlackWebhook result", response);
}

// --------------
//  Sheet Parser
// --------------

function getQnA() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

  const dataRange = sheet.getDataRange();

  const last_col = dataRange.getLastColumn();
  const last_row = dataRange.getLastRow();

  // reference : https://developers.google.com/apps-script/reference/spreadsheet/sheet?hl=en#getrangerow,-column,-numrows,-numcolumns
  const questions = sheet.getRange(1, 1, 1, last_col).getValues()[0];
  const newestResponses = sheet.getRange(last_row, 1, 1, last_col).getValues()[0];
  // log("questions", questions);
  // log("newestResponse", newestResponses);

  const qna = questions.map((question, idx) => [question, newestResponses[idx]]); // 1:1 matching on questions with responses
  return qna;
}

// -------------------------
//  Slack Message Sender
// -------------------------

// reference: https://github.com/markfguerra/google-forms-to-slack/blob/master/code.js
function notifyToSlack(blocks) {
  const payload = {
    channel: channelName,
    text: notificationText,
    blocks: blocks,
  };

  const options = {
    method: "post",
    payload: JSON.stringify(payload),
  };

  const response = UrlFetchApp.fetch(slackIncomingWebhookUrl, options);
  // reference : https://developers.google.com/apps-script/reference/url-fetch/http-response#getresponsecode
  return response.getresponsecode();
}

// -------------------------
//  Slack Message Generator
// -------------------------

// reference: https://app.slack.com/block-kit-builder/ (you need to log-in in advance)
function generateSlackMessage(qna) {
  const blocks = [];

  const header = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: notificationText,
    },
  };

  const divider = {
    type: "divider",
  };

  blocks.push(header);
  blocks.push(divider);

  qna.forEach(([q, a]) => blocks.push(_generateBlock(q, a)));

  return blocks;

  function _generateBlock(question, answer) {
    return {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Q. ${question}*\nA. ${answer}`,
      },
    };
  }
}

// ---------------
//  Log Formatter
// ---------------

function log(loggerName, json) {
  if (!PRINT_LOG) return;
  Logger.log(`=========== ${loggerName} ===========`);
  Logger.log(`${JSON.stringify(json, null, 4)}\n`);
}
