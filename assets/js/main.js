// assets/js/main.js
import { router } from "./router.js";

$(document).ready(function () {
  router();
  $(window).on("hashchange", router);
});
