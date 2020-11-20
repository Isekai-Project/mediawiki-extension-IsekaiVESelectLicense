var ccLicenses = {
    'cc-by': {
        url: 'http://creativecommons.org/licenses/by/4.0/deed.zh',
        name: mw.message('isekai-ve-selectlicense-license-cc-by').text(),
        permission: {
            commerce: 'allow',
            remix: 'allow'
        }
    },
    'cc-by-nd': {
        url: 'http://creativecommons.org/licenses/by-nd/4.0/deed.zh',
        name: mw.message('isekai-ve-selectlicense-license-cc-by-nd').text(),
        permission: {
            commerce: 'allow',
            remix: 'deny'
        }
    },
    'cc-by-sa': {
        url: 'http://creativecommons.org/licenses/by-sa/4.0/deed.zh',
        name: mw.message('isekai-ve-selectlicense-license-cc-by-sa').text(),
        permission: {
            commerce: 'allow',
            remix: 'sharealike'
        }
    },
    'cc-by-nc': {
        url: 'http://creativecommons.org/licenses/by-nc/4.0/deed.zh',
        name: mw.message('isekai-ve-selectlicense-license-cc-by-nc').text(),
        permission: {
            commerce: 'deny',
            remix: 'allow'
        }
    },
    'cc-by-nc-nd': {
        url: 'http://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh',
        name: mw.message('isekai-ve-selectlicense-license-cc-by-nc-nd').text(),
        permission: {
            commerce: 'deny',
            remix: 'deny'
        }
    },
    'cc-by-nc-sa': {
        url: 'http://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh',
        name: mw.message('isekai-ve-selectlicense-license-cc-by-nc-sa').text(),
        permission: {
            commerce: 'deny',
            remix: 'sharealike'
        }
    }
};

function getLicenseDesc(permission) {
    let baseRight = new OO.ui.MessageWidget({
        type: 'warning',
        inline: true,
        label: mw.message('isekai-ve-selectlicense-needattribution').text(),
    }).setIcon('fa-warning');
    let commerceRight = new OO.ui.MessageWidget({ inline: true });
    let remixRight = new OO.ui.MessageWidget({ inline: true });
    switch (permission.commerce) {
        case 'allow':
            commerceRight.setType('success');
            commerceRight.setIcon('fa-check');
            commerceRight.setLabel(mw.message('isekai-ve-selectlicense-allowcommerce').text());
            break;
        case 'deny':
            commerceRight.setType('error');
            commerceRight.setIcon('fa-ban');
            commerceRight.setLabel(mw.message('isekai-ve-selectlicense-denycommerce').text());
            break;
    }

    switch (permission.remix) {
        case 'sharealike':
            remixRight.setType('notice');
            remixRight.setIcon('fa-check');
            remixRight.setLabel(mw.message('isekai-ve-selectlicense-sharealike').text());
            break;
        case 'allow':
            remixRight.setType('success');
            remixRight.setIcon('fa-check');
            remixRight.setLabel(mw.message('isekai-ve-selectlicense-allowadapt').text());
            break;
        case 'deny':
            remixRight.setType('error');
            remixRight.setIcon('fa-ban');
            remixRight.setLabel(mw.message('isekai-ve-selectlicense-denyadapt').text());
            break;
    }

    let ret = new OO.ui.Widget({
        content: [
            new OO.ui.Widget({ content: [baseRight] }),
            new OO.ui.Widget({ content: [commerceRight] }),
            new OO.ui.Widget({ content: [remixRight] }),
        ]
    });
    return ret.$element;
}

/**
 * 异世界百科 选择授权协议页面
 *
 * @class
 * @extends OO.ui.PageLayout
 *
 * @constructor
 * @param {string} name Unique symbolic name of page
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$overlay] Overlay to render dropdowns in
 */
ve.ui.IsekaiSelectLicensePage = function IsekaiSelectLicensePage(name, config) {
    var page = this;

    // 完成父类的构造函数
    ve.ui.IsekaiSelectLicensePage.super.apply(this, arguments);

    // Properties
    this.tocOptionTouched = false;
    this.licenseNode = null;
    this.redirectOptionsTouched = false;
    this.tableOfContentsTouched = false;
    this.label = mw.message('isekai-ve-selectlicense').text();

    this.currentLicense = 'default';
    this.recommandLicense = false;
    this.defaultLicense = '';

    // 选择面板
    this.selectLicenseFieldset = new OO.ui.FieldsetLayout({
        label: mw.message('isekai-ve-selectlicense-label').text(),
        icon: 'article'
    });

    // 初始化页面内容
    //选择框
    this.licenseInput = new OO.ui.DropdownInputWidget({
        options: [
            { data: null, label: mw.message('isekai-ve-selectlicense-defaultlicense').text() },
        ],
    });
    this.licenseInput.connect(this, { change: 'onLicenseInputChange' });

    this.licenseField = new OO.ui.FieldLayout(
        this.licenseInput, {
            $overlay: config.$overlay,
            align: 'top',
            label: mw.message('isekai-ve-selectlicense-field-label').text(),
            help: mw.message('isekai-ve-selectlicense-field-help').text()
        }
    );
    //向导按钮
    this.licenseSwitchGuideBtn = new OO.ui.ButtonWidget({
        label: mw.message('isekai-ve-selectlicense-useguide-label').text(),
    });
    this.licenseSwitchGuideBtn.connect(this, { click: 'switchToGuidePanel' });

    this.licenseSwitchGuideField = new OO.ui.FieldLayout(
        this.licenseSwitchGuideBtn, {
            $overlay: config.$overlay,
            align: 'top',
            label: mw.message('isekai-ve-selectlicense-useguide-field-label').text(),
            help: mw.message('isekai-ve-selectlicense-useguide-field-help').text(),
        }
    );

    this.selectLicenseFieldset.addItems([
        this.licenseField,
        this.licenseSwitchGuideField,
    ]);

    // 向导面板
    this.selectLicenseGuideFieldset = new OO.ui.FieldsetLayout({
        label: mw.message('isekai-ve-selectlicense-guide').text(),
        icon: 'robot',
        classes: ['isekai-selectlicense-guide-fieldset']
    });
    this.selectLicenseGuideFieldset.toggle(false);
    // 第一问 是否已发布
    this.NovelStatusField = new OO.ui.FieldLayout(
        new OO.ui.ButtonSelectWidget({
            classes: ['isekai-selectLicense-guide-select'],
            items: [
                new OO.ui.ButtonOptionWidget({
                    data: 'publish',
                    label: mw.message('isekai-ve-selectlicense-guide-novelstatus-option-publish').text()
                }),
                new OO.ui.ButtonOptionWidget({
                    data: 'unpublish',
                    label: mw.message('isekai-ve-selectlicense-guide-novelstatus-option-unpublish').text()
                })
            ]
        }).connect(this, { select: 'updateRecommandLicense' }), {
            $overlay: config.$overlay,
            align: 'top',
            label: mw.message('isekai-ve-selectlicense-guide-novelstatus-field-label').text(),
            help: mw.message('isekai-ve-selectlicense-guide-novelstatus-field-help').text()
        }
    );

    // 第二问 是否允许同人
    this.AllowRemixField = new OO.ui.FieldLayout(
        new OO.ui.ButtonSelectWidget({
            classes: ['isekai-selectLicense-guide-select'],
            items: [
                new OO.ui.ButtonOptionWidget({
                    data: 'sharealike',
                    label: mw.message('isekai-ve-selectlicense-guide-allowremix-option-sharealike').text()
                }),
                new OO.ui.ButtonOptionWidget({
                    data: 'allow',
                    label: mw.message('isekai-ve-selectlicense-guide-allowremix-option-allow').text()
                }),
                new OO.ui.ButtonOptionWidget({
                    data: 'deny',
                    label: mw.message('isekai-ve-selectlicense-guide-allowremix-option-deny').text()
                })
            ]
        }).connect(this, { select: 'updateRecommandLicense' }), {
            $overlay: config.$overlay,
            align: 'top',
            label: mw.message('isekai-ve-selectlicense-guide-allowremix-field-label').text(),
            help: mw.message('isekai-ve-selectlicense-guide-allowremix-field-help').text()
        }
    );

    //结果区域
    this.recommandLicenseWidget = new OO.ui.Widget({
        classes: ['isekai-selectLicense-guide-recommand'],
    });
    this.recommandLicenseNameDom = $(this.recommandLicenseWidget.$element).append('<span class="license-name"></span>').find('span:last');
    this.recommandLicenseDescDom = $(this.recommandLicenseWidget.$element).append('<div></div>').find('div:last');

    this.recommandLicenseField = new OO.ui.FieldLayout(
        this.recommandLicenseWidget, {
            $overlay: config.$overlay,
            label: mw.message('isekai-ve-selectlicense-guide-result-field-label').text(),
            align: 'top'
        }
    );

    //选项
    this.useCurrentLicenseBtn = new OO.ui.ButtonWidget({
        label: mw.message('isekai-ve-selectlicense-guide-apply-label').text(),
        flags: ['primary', 'progressive'],
        disabled: true, //默认禁用，选择完成后启用
    });
    this.useCurrentLicenseBtn.connect(this, { click: 'useRecommandLicense' });

    this.backToSelectBtn = new OO.ui.ButtonWidget({
        label: mw.message('isekai-ve-selectlicense-guide-cancel-label').text(),
        flags: 'destructive',
    });
    this.backToSelectBtn.connect(this, { click: 'switchToSelectPanel' });

    this.guideActions = new OO.ui.FieldLayout(
        new OO.ui.Widget({
            content: [
                new OO.ui.HorizontalLayout({
                    items: [
                        this.useCurrentLicenseBtn,
                        this.backToSelectBtn
                    ]
                })
            ]
        }), {
            $overlay: config.$overlay,
            align: 'top',
        }
    );

    this.selectLicenseGuideFieldset.addItems([
        this.NovelStatusField,
        this.AllowRemixField,
        this.recommandLicenseField,
        this.guideActions
    ]);

    this.$element.append(this.selectLicenseFieldset.$element);
    this.$element.append(this.selectLicenseGuideFieldset.$element);
};

/* 继承 */
OO.inheritClass(ve.ui.IsekaiSelectLicensePage, OO.ui.PageLayout);

/**
 * @inheritdoc
 */
ve.ui.IsekaiSelectLicensePage.prototype.setOutlineItem = function() {
    // Parent method
    ve.ui.IsekaiSelectLicensePage.super.prototype.setOutlineItem.apply(this, arguments);

    if (this.outlineItem) {
        this.outlineItem
            .setIcon('article')
            .setLabel(mw.message('isekai-ve-selectlicense').text());
    }
};

ve.ui.IsekaiSelectLicensePage.prototype.getFieldsets = function() {
    return [
        this.selectLicenseFieldset,
    ];
};

ve.ui.IsekaiSelectLicensePage.prototype.switchToGuidePanel = function() {
    this.selectLicenseFieldset.toggle(false);
    this.selectLicenseGuideFieldset.toggle(true);
    this.recommandLicense = false;
};

ve.ui.IsekaiSelectLicensePage.prototype.switchToSelectPanel = function() {
    this.selectLicenseFieldset.toggle(true);
    this.selectLicenseGuideFieldset.toggle(false);
    this.recommandLicense = false;
};

ve.ui.IsekaiSelectLicensePage.prototype.updateSelect = function() {
    this.licenseInput.setValue(this.currentLicense);
};

ve.ui.IsekaiSelectLicensePage.prototype.useRecommandLicense = function() {
    if (!this.recommandLicense){
        return;
    }
    if (this.recommandLicense === this.defaultLicense) {
        this.recommandLicense = 'default';
    }
    this.currentLicense = this.recommandLicense;
    this.updateSelect();
    this.switchToSelectPanel();
};

ve.ui.IsekaiSelectLicensePage.prototype.updateRecommandLicense = function() {
    //已发布和未发布，应该是CC-BY-NC
    //不打算发布是CC-BY
    var novelStatusItem = this.NovelStatusField.getField().findSelectedItem();
    var allowRemixItem = this.AllowRemixField.getField().findSelectedItem();
    if (!novelStatusItem || !allowRemixItem){
        return;
    }

    var novelStatus = novelStatusItem.getData();
    var allowRemix = allowRemixItem.getData();
    var license = 'cc-by';

    if (novelStatus === 'publish') {
        license += '-nc';
    }

    switch (allowRemix) {
        case 'sharealike':
            license += '-sa';
            break;
        case 'deny':
            license += '-nd';
            break;
    }

    let licenseData = ccLicenses[license];
    if (licenseData) {
        this.recommandLicenseNameDom.text(licenseData.name);
        this.recommandLicenseDescDom.empty().append(getLicenseDesc(licenseData.permission));
        this.recommandLicense = license;
        this.useCurrentLicenseBtn.setDisabled(false);
    } else {
        this.recommandLicenseNameDom.text(mw.message('isekai-ve-selectlicense-guide-error').text());
    }
};

ve.ui.IsekaiSelectLicensePage.prototype.onLicenseInputChange = function() {
    this.currentLicense = this.licenseInput.getValue();
    //为了让“保存更改”正常使用，必须把value设置成data
    this.licenseInput.setData(this.currentLicense);
};

/**
 * Get the first meta item of a given name
 *
 * @param {string} name Name of the meta item
 * @return {Object|null} Meta item, if any
 */
ve.ui.IsekaiSelectLicensePage.prototype.getMetaItem = function(name) {
    return this.metaList.getItemsInGroup(name)[0] || null;
};

ve.ui.IsekaiSelectLicensePage.prototype.setup = function(surface, config) {
    this.metaList = surface.getMetaList();
    window.isekaiDebug = { surface, config };
    var licenses = mw.config.get('wgIsekaiLicenses');
    var options = [];
    for (var key in licenses) {
        if (licenses[key].default) { //默认授权协议
            this.defaultLicense = key;
            options.push({
                data: 'default',
                label: licenses[key].name + mw.message('isekai-ve-selectlicense-tip-defaultlicense').text(),
            });
        } else {
            options.push({
                data: key,
                label: licenses[key].name
            });
        }
    }
    this.licenseInput.setOptions(options);
    //搜索现有的授权协议
    this.licenseNode = this.getMetaItem('isekaiLicense');
    window.isekaiLicenseNode = this.licenseNode;
    //选中当前的授权协议
    if (this.licenseNode && this.licenseNode.getAttribute('license')) {
        this.licenseInput.setValue(this.licenseNode.getAttribute('license'));
    } else {
        this.licenseInput.setValue('default');
    }
    return ve.createDeferred().resolve().promise();
};

//关闭窗口事件
ve.ui.IsekaiSelectLicensePage.prototype.teardown = function(data) {
    let licenseId = this.licenseInput.getData();
    if (licenseId === 'default') { //默认授权协议，删除标签
        if (this.licenseNode) {
            this.licenseNode.remove();
        }
    } else {
        if (this.licenseNode) {
            this.licenseNode.replaceWith(this.licenseNode.newFromLicenseId(licenseId));
        } else {
            //增加新的标签
            this.metaList.insertMeta(ve.dm.IsekaiLicenseMetaItem.static.makeData(licenseId), 0);
        }
    }
};