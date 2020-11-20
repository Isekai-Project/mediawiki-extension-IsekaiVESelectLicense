/**
 * Isekai set license meta item.
 *
 * @class
 * @extends ve.dm.MetaItem
 * @constructor
 * @param {Object} element Reference to element in meta-linmod
 */
ve.dm.IsekaiLicenseMetaItem = function VeDmIsekaiLicenseMetaItem() {
    // Parent constructor
    ve.dm.IsekaiLicenseMetaItem.super.apply(this, arguments);
};

/* Inheritance */
OO.inheritClass(ve.dm.IsekaiLicenseMetaItem, ve.dm.MetaItem);

/* Static Properties */
ve.dm.IsekaiLicenseMetaItem.static.name = 'isekaiLicense';
ve.dm.IsekaiLicenseMetaItem.static.group = 'isekaiLicense';
ve.dm.IsekaiLicenseMetaItem.static.matchTagNames = ['div'];
ve.dm.IsekaiLicenseMetaItem.static.matchRdfaTypes = ['mw:Extension/license'];

/* Methods */
ve.dm.IsekaiLicenseMetaItem.static.toDataElement = function(domElements) {
    window.isekaiLicenseDom = domElements;
    var licenseData = domElements[0].getAttribute('data-mw');
    var licenseId = '';
    licenseData = JSON.parse(licenseData);
    if (licenseData && licenseData.body && licenseData.body.extsrc) {
        licenseId = licenseData.body.extsrc;
    }
    return {
        type: this.name,
        attributes: {
            license: licenseId,
        }
    };
};

ve.dm.IsekaiLicenseMetaItem.static.toDomElements = function(dataElement, doc) {
    var divElement = doc.createElement('div');
    divElement.setAttribute('typeof', 'mw:Extension/license');
    divElement.setAttribute('data-mw', JSON.stringify({
        name: 'license',
        attrs: {
            type: 'box',
        },
        body: {
            extsrc: dataElement.attributes.license,
        }
    }));
    return [divElement];
};

ve.dm.IsekaiLicenseMetaItem.static.makeData = function(licenseId) {
    return {
        type: this.name,
        attributes: {
            license: licenseId,
        },
    };
};

ve.dm.IsekaiLicenseMetaItem.prototype.newFromLicenseId = function(licenseId) {
    return ve.extendObject(true, {},
        this.getElement(), this.constructor.static.makeData(licenseId)
    );
};

/* Registration */
ve.dm.modelRegistry.register(ve.dm.IsekaiLicenseMetaItem);