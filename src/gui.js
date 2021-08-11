const xapi = require('xapi');

function panelRemoveAll() {
  return xapi.Command.UserInterface.Extensions.Clear();
}

function panelSave(PanelId, config) {
  return xapi.Command.UserInterface.Extensions.Panel.Save({ PanelId }, config);
}

function panelRemove(PanelId) {
  return xapi.Command.UserInterface.Extensions.Panel.Remove({ PanelId });
}

function widgetSetValue(WidgetId, Value) {
  return xapi.Command.UserInterface.Extensions.Widget.SetValue({ Value, WidgetId });
}

function onWidgetAction(callback, action = '', widgetId = '') {
  // todo: just one listener in total
  xapi.Event.UserInterface.Extensions.Widget.Action.on(e => {
    if (action && e.Type !== action) return;
    if (widgetId && e.WidgetId !== widgetId) return;
    callback(e);
  });
}

function onPanelClicked(callback, panelId = '') {
  xapi.UserInterface.Extensions.Panel.Clicked.on(e => {
    if (panelId && e.PanelId !== panelId) return;
    callback(e);
  });
}

// TODO
// function onPageAction(callback, action = '', pageId = '') {}

module.exports = {
  panelRemoveAll,
  panelRemove,
  panelSave,
  widgetSetValue,
  onWidgetAction,
  onPanelClicked,
};