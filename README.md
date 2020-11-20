# Isekai SelectLicense VE extension
# Installation
this plugin require IsekaiSelectLicense extension. You can get it on [GitHub Repo](https://github.com/Isekai-Project/mediawiki-extension-IsekaiSelectLicense).

# Configure
Please add Creativecommons License in LocalSettings.php

```php
// =========================================
//  Isekai Select License Settings
// =========================================
$wgIsekaiLicenses = [
	'cc-by' => [
		'url' => 'http://creativecommons.org/licenses/by/4.0/deed.zh',
		'name' => '知识共享署名 4.0 国际许可协议',
		'icon' => "$wgResourceBasePath/resources/assets/licenses/cc-by.svg",
		'openness' => 3,
	],
	'cc-by-nd' => [
		'url' => 'http://creativecommons.org/licenses/by-nd/4.0/deed.zh',
		'name' => '知识共享署名-禁止衍生 4.0 国际许可协议',
		'icon' => "$wgResourceBasePath/resources/assets/licenses/cc-by-nd.svg",
		'openness' => 1,
	],
	'cc-by-sa' => [
		'url' => 'http://creativecommons.org/licenses/by-sa/4.0/deed.zh',
		'name' => '知识共享署名-相同方式共享 4.0 国际许可协议',
		'icon' => "$wgResourceBasePath/resources/assets/licenses/cc-by-sa.svg",
		'default' => true,
		'openness' => 2,
	],
	'cc-by-nc' => [
		'url' => 'http://creativecommons.org/licenses/by-nc/4.0/deed.zh',
		'name' => '知识共享署名-非商业性使用 4.0 国际许可协议',
		'icon' => "$wgResourceBasePath/resources/assets/licenses/cc-by-nc.svg",
		'openness' => 2,
	],
	'cc-by-nc-nd' => [
		'url' => 'http://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh',
		'name' => '知识共享署名-非商业性使用-禁止衍生 4.0 国际许可协议',
		'icon' => "$wgResourceBasePath/resources/assets/licenses/cc-by-nc-nd.svg",
		'openness' => 1,
	],
	'cc-by-nc-sa' => [
		'url' => 'http://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh',
		'name' => '知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议',
		'icon' => "$wgResourceBasePath/resources/assets/licenses/cc-by-nc-sa.svg",
		'openness' => 2,
	],
];
```

You can find CC Licenses' Logo in ```IsekaiSelectLicense/docs/license icons```