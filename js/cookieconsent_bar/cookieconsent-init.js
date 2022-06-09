// obtain cookieconsent plugin
var cc = initCookieConsent();

// run plugin with config object
cc.run({
    current_lang : 'ja',                        // デフォルトの言語
    autoclear_cookies : true,
    cookie_name: 'cookieconcent_status',        // 同意Cookie名
    cookie_expiration : 365,                    // Cookieの有効期限、日単位(182日=６ヶ月)
    page_scripts: true,
    auto_language: 'browser',

    //下記は基本的に使わない
    // autorun: true,                           // default: true
    // delay: 0,                                // default: 0
    // force_consent: false,                    // default: 0
    // hide_from_bots: false,                   // default: false
    // remove_cookie_tables: false              // default: false
    // cookie_domain: "upsell.jp",              // default: current domain
    // cookie_path: "/",                        // default: root
    // cookie_same_site: "Lax",
    // use_rfc_cookie: true,                    // default: false
    // revision: 0,                             // default: 0

    gui_options: {
        consent_modal: {
            layout: 'bar',                      // box,bar
            position: 'bottom center',          // bottom,middle,top + left,right,center
            transition: 'slide'                 
        },
        settings_modal: {
            layout: 'box',                      // box,bar
            position: 'left',                   // right,left (available only if bar layout selected)
            transition: 'slide'                 // zoom,slide
        }
    },

    onFirstAction: function(){
        console.log('onFirstAction fired');
    },

    onAccept: function (cookie) {
        console.log('onAccept fired ...');
        window.TechtouchObject = {
            organizationUuid: "orga-625635c0-26dd-e064-fc5b-1f1e35f4cd01",
            analyticsEnabled: cc.allowedCategory('analytics'),
        };     
        if (!(cc.allowedCategory('analytics'))) {
            cc.eraseCookies(['_tt_geuid'],'/','.sh-tatsuno.github.io');
        }
    },

    onChange: function (cookie, changed_preferences) {
        console.log('onChange fired ...');
        if (!(cc.allowedCategory('analytics'))) {
            cc.eraseCookies(['_tt_geuid'],'/','.sh-tatsuno.github.io');
        }      
    },

    languages: {
        'ja': {
            consent_modal: { // 同意バナーの文言記入箇所
                description: '電子調達ポータルでクッキー等を使用して、アクセス状況の分析や利便性向上を行っています。同意いただける方は「同意する」をクリックして下さい。<button type="button" data-cc="c-settings" class="cc-link">個人情報保護について</button>',
                secondary_btn: {
                    text: '同意しない',
                    role: 'accept_necessary'        // 'settings' or 'accept_necessary'
                },
                primary_btn: {
                    text: '同意する',
                    role: 'accept_all'              // 'accept_selected' or 'accept_all'
                }
            },
            settings_modal: { // 同意詳細ポップアップの文言記入箇所
                title: "",
                save_settings_btn: '設定を保存する',
                accept_all_btn: '同意する',
                reject_all_btn: '同意しない',
                close_btn_label: 'Close',
                cookie_table_headers: [
                    {col1: '名前'},
                    {col2: 'ホスト'},
                    {col3: '期間'},
                    {col4: '説明'}
                ],
                blocks: [
                    {
                        title: '利用するCookieについて',
                        description: '当ウェブサイトでは、ウェブサイトの利便性向上のためにクッキーを使用しています。ユーザーはいつでも、各カテゴリーについてオプトイン/アウトを選択することができます。クッキーやその他の機密データに関する詳細については、 <a href="https://sh-tatsuno.github.io/snippet_sample/policy.html" class="cc-link">プライバシーポリシー</a>をお読みください。'
                    }, {
                        title: '必須Cookie',
                        description: 'これらのクッキーは、当ウェブサイトを適切に機能させるために不可欠なものです。これらのクッキーがなければ、ウェブサイトは正常に機能しません',
                        toggle: {
                            value: 'necessary',
                            enabled: true,
                            readonly: true          // cookie categories with readonly=true are all treated as "necessary cookies"
                        },
                        cookie_table: [
                            {
                                col1: 'cookieconcent_status',
                                col2: '利用するドメインを記入', //NTTデータ様：修正必須箇所
                                col3: '1年間',               //NTTデータ様：確認必須箇所
                                col4: 'このクッキーは同意バナーの管理に使用されます',
                                is_regex: true
                            }
                        ]
                    }, {
                        title: 'パフォーマンスクッキー',
                        description: 'これらのクッキーは、当ウェブサイトの訪問者がサイト内をどのように移動するかを理解し、サイトのパフォーマンスの測定や改善に役立てています。これらのクッキーの利用が停止された場合、当社は利用者がサイトを訪問したことや利用者のサイト上での動きを把握することはできません',
                        toggle: {
                            value: 'analytics',     // there are no default categories => you specify them
                            enabled: false,
                            readonly: false
                        },
                        cookie_table: [
                            {
                                col1: 'tt_geuid',
                                col2: '利用するドメインを記入', //NTTデータ様：修正必須箇所
                                col3: '1年間',               //NTTデータ様：確認必須箇所
                                col4: 'このクッキーは、ユーザーを匿名的に区別し、ユーザーのイベントを行なった情報などから分析の軸とするために使用されます',
                                is_regex: true
                            }
                        ]
                    }
                ]
            }
        }
    }
});
