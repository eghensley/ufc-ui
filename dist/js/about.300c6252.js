(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{f820:function(e,t,i){"use strict";i.r(t);var o=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},a=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"about"},[i("div",{staticClass:"container"},[i("div",{staticClass:"content"},[i("h1",[e._v("UFC Prediction Engine")]),i("p",[e._v(" This application aims to provide a profitable betting approach by removing human bias and relying only on statical evidence.")]),i("h2",[e._v(" Trust the System ")]),i("p",[e._v(" The value proposition for this algorithm is two pronged: ")]),i("ol",[i("li",[e._v(" Limit downside through the removal of personal bias ")]),i("li",[e._v(" Identify areas of opportunity spawned from emotional and non-quantitative UFC bettors ")])]),i("p",[e._v(" This algorithm is trained, back-tested, and cross-validated to reach an optimal set of rules which maximize long term results through the identification of "),i("strong",[e._v(" value ")]),e._v(" picks. At the end of the night, its not how many fights you pick correctly, its how much money did you win. Betting on heavy favorites is tempting, but not a sustainable long term approach. Instead, a progressive betting approach seeks out value and wagers corresponding to the expected ROI. ")]),i("h2",[e._v(" Identification of Value and Wager Calculation")]),i("p",[e._v(' The issue many face is difficulty in conceptualizing probabilities and reflecting changes in decision making: we react the same way to 54% as 56%, both are seen as "slightly above half". But with a standard vig, that 2% is the difference between long term profit and loss. This difficulty only compounds as odds increase. To a person, -285 and -310 are roughly equivalent. The goal of this application is to both remove this flaw from our bets as well as capitalize on its existance. ')]),i("p",[e._v(" For each bout which meets a series of optimized thresholds and criteria, an expected win probability for each fighter is generated by the core model. These odds are then compared to the implied probability of the average Vegas money line. The difference between these values is then fed through a top-level algorithm which filters non-advantagous bets and determines the optimal wager amount. ")]),i("p",[e._v(" This model does "),i("strong",[e._v("not")]),e._v(" use a standard bet, proportioned across candidates. It evaludates each bet independently and only considers expected ROI. This means that some fights may have very low action or even no bets made. ")]),i("p",[e._v(" The model's range for wagers is $0 - $200. It is recommended to either use the same wagers provided, or to scale each wager by a common factor. Additionally, the wagers are all based on average Vegas odds. Your book may be slightly different, and our team is working on a conversion feature. ")]),i("h2",[e._v(" Calculation of Win Probability ")]),i("p",[e._v(" The main driver for identifying value bets is our win probability algorithm. Every stat feeds into a set of 8 characteristics for a fighter, updated through an pseudo-ELO approach. There are 4 base values: ")]),i("ol",[i("li",[i("strong",[e._v("Striking Offense")]),e._v(": ability to generate striking output consistent with a knockout")]),i("li",[i("strong",[e._v("Striking Defense")]),e._v(": ability to avoid striking consistent with a knockout ")]),i("li",[i("strong",[e._v("Grappling Offense")]),e._v(": ability to generate grappling output consistent with a submission")]),i("li",[i("strong",[e._v("Grappling Defense")]),e._v(": ability to avoid grappling output consistent with a submission ")])]),i("p",[e._v(' And 4 "multiplier" values: ')]),i("ol",[i("li",[i("strong",[e._v("KO Power")]),e._v(": ability to generate knockouts from striking output not consistent with a knockout ")]),i("li",[i("strong",[e._v("Chin")]),e._v(": ability to withstand striking output consistent with a knockout ")]),i("li",[i("strong",[e._v("Submission")]),e._v(": ability to generate submissions from grappling output not consistent with a submission ")]),i("li",[i("strong",[e._v("Evasiveness")]),e._v(": ability to withstand grappling output consistent with a submission ")])]),i("h2",[e._v(" Technical Specs ")]),i("p",[e._v(" The platform is a full-stack distributed architecture, utilizing Vue.js front end, python-flask and java spring-boot API layers, and a Postgresql DB backend. The environment is hosted through IBM Cloud using Cloud Foundry. ")])])])])}],n=i("2877"),s={},r=Object(n["a"])(s,o,a,!1,null,null,null);t["default"]=r.exports}}]);
//# sourceMappingURL=about.300c6252.js.map