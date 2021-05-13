var _initialize = ve.ui.MWMetaDialog.prototype.initialize;
ve.ui.MWMetaDialog.prototype.initialize = function() {
    _initialize.apply(this, arguments);
    this.isekaiSelectLicensePage = new ve.ui.IsekaiSelectLicensePage('selectLicense', { $overlay: this.$overlay });
    this.bookletLayout.addPages([
        this.isekaiSelectLicensePage
    ]);
    this.widgetList = this.getAllWidgets();

};

//注入setup
var _getSetupProcess = ve.ui.MWMetaDialog.prototype.getSetupProcess;
ve.ui.MWMetaDialog.prototype.getSetupProcess = function(data) {
    return _getSetupProcess.call(this, data).next(function() {
            var surfaceModel = this.getFragment().getSurface();
            var config = {
                data,
                isReadOnly: this.isReadOnly()
            };
            return this.isekaiSelectLicensePage.setup(surfaceModel, config);
        }, this)
        .next(function() {
            //覆盖旧设定，禁止“保存设定”
            this.oldSettings = this.extractSettings();
            this.actions.setAbilities({ done: false });
        }, this);
};

//注入teardown
var _getTeardownProcess = ve.ui.MWMetaDialog.prototype.getTeardownProcess;
ve.ui.MWMetaDialog.prototype.getTeardownProcess = function(data) {
    data = data || {}; //防止出现data不存在造成报错的情况
    return _getTeardownProcess.call(this, data).first(function() {
        this.isekaiSelectLicensePage.teardown({ action: data.action });
    }, this);
};

//注入extractValue
var _extractValue = ve.ui.MWMetaDialog.prototype.extractValue;
ve.ui.MWMetaDialog.prototype.extractValue = function(field) {
    if (field instanceof OO.ui.DropdownInputWidget) {
        return field.getData();
    } else if (field instanceof OO.ui.ButtonWidget) {
        return undefined;
    }
    return _extractValue.apply(this, arguments);
};

function getActionGroupId(name) {
    var actionGroups;
    if('DesktopArticleTarget' in ve.init.mw){
        actionGroups = ve.init.mw.DesktopArticleTarget.static.actionGroups;
    } else if('MobileArticleTarget' in ve.init.mw) {
        actionGroups = ve.init.mw.MobileArticleTarget.static.toolbarGroups;
    }
    for (var i = 0; i < actionGroups.length; i++) {
        var one = actionGroups[i];
        if (one.name === name) {
            return i;
        }
    }
    return false;
}

function insertAfter(arr, item, after) {
    var index = arr.indexOf(after);
    arr.splice(index + 1, 0, item);
    return arr;
}

//注入工具栏
if('DesktopArticleTarget' in ve.init.mw){
    var pageMenuId = getActionGroupId('pageMenu');
    ve.init.mw.DesktopArticleTarget.static.actionGroups[pageMenuId].include =
        insertAfter(ve.init.mw.DesktopArticleTarget.static.actionGroups[pageMenuId].include, 'selectLicense', 'templatesUsed');
}