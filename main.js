import fetch from "./fetch";
import config from "./config";
import {
  htmlEntities,
  colorHash,
  copyToClipboard,
  hashCode,
  renderTimes
} from "./ui";
import {
  getChallenges,
  getChallenge,
  displayChallenges
} from "./pages/challenges";
import {
  displayChallenge,
  submitChallenge,
  loadSolves,
  displaySolves,
  loadHint,
  displayHint
} from "./pages/challenge";
import { getScoreboard, getScoreboardDetail } from "./pages/scoreboard";
import { updateSettings, generateToken, deleteToken } from "./pages/settings";
import { userSolves, userFails, userAwards } from "./pages/users";
import {
  getInviteToken,
  disbandTeam,
  updateTeamSettings,
  teamSolves,
  teamFails,
  teamAwards
} from "./pages/teams";

import eventsInit from "./events/main";

import MarkdownIt from "markdown-it";
import $ from "jquery";

const user = {};
const _internal = {};
const _functions = {
  challenge: {
    // Displaying challenge and render challenge
    displayChallenge: null,
    renderChallenge: null,

    // Displaying hints and unlocks
    displayHint: null,
    displayUnlock: null,
    displayUnlockError: null,

    // Submit challenge and display reponse data
    submitChallenge: null,
    displaySubmissionResponse: null,

    // Display solves for challenge
    displaySolves: null
  },
  challenges: {
    // Display challenges on page
    displayChallenges: null,

    // How to sort challenges before display
    sortChallenges: null
  },
  events: {
    eventAlert: null,
    eventToast: null,
    eventBackground: null
  }
};
const ui = {
  htmlEntities,
  colorHash,
  copyToClipboard,
  hashCode,
  renderTimes
};
const pages = {
  challenge: {
    displayChallenge,
    submitChallenge,
    loadSolves,
    displaySolves,
    loadHint,
    displayHint
  },
  challenges: {
    getChallenges,
    getChallenge,
    displayChallenges
  },
  scoreboard: {
    getScoreboard,
    getScoreboardDetail
  },
  settings: {
    updateSettings,
    generateToken,
    deleteToken
  },
  users: {
    userSolves,
    userFails,
    userAwards
  },
  teams: {
    getInviteToken,
    disbandTeam,
    updateTeamSettings,
    teamSolves,
    teamFails,
    teamAwards
  }
};
const lib = {
  $,
  markdown
};

let initialized = false;
const init = data => {
  if (initialized) {
    return;
  }
  initialized = true;

  config.urlRoot = data.urlRoot || config.urlRoot;
  config.csrfNonce = data.csrfNonce || config.csrfNonce;
  config.userMode = data.userMode || config.userMode;
  config.start = data.start || config.start;
  config.end = data.end || config.end;
  config.themeSettings = data.themeSettings || config.themeSettings;
  user.id = data.userId;

  eventsInit(config.urlRoot);
};
const plugin = {
  run: f => {
    f(CTFd);
  }
};
function markdown(config) {
  // Merge passed config with original. Default to original.
  const md_config = { ...{ html: true, linkify: true }, ...config };
  const md = MarkdownIt(md_config);
  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    tokens[idx].attrPush(["target", "_blank"]);
    return self.renderToken(tokens, idx, options);
  };
  return md;
}

const CTFd = {
  init,
  config,
  fetch,
  user,
  ui,
  pages,
  _internal,
  _functions,
  plugin,
  lib
};

window.CTFd = CTFd;
export default CTFd;
