'use strict';

$(function() {
    window.Env = new nunjucks.Environment(null, {autoescape: false});

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    // Models
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    var clsNoteModel = Backbone.Model.extend({
        urlRoot: "/api/item",
        idAttribute: "_id",

        defaults: function() {
            return {
                title: 'empty title...',
                note:  'empty note ...',
                mark: false,
            };
        },

        validate: function(attrs, options) {
            if (attrs.title.length == 0)  {
                return "Backbone: Title is not zero length";
            };

            if (attrs.note.length < 10)  {
                return "Backbone: Need note length above 10 chars";
            };
        }
    });

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    var clsEventModel = Backbone.Model.extend({
        defaults: function() {
            return {
                search: '',
                page_view: true,
                page_numb: 1,
                notes_count: 0,
                notes_in_page: 5,
                scroll_pos: 0
            };
        },

        initialize: function() {
            Backbone.Model.prototype.initialize.apply(this, arguments);
        }
    });

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    // Collections
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    var clsNotesCollection = Backbone.Collection.extend({
        model: clsNoteModel,
        url: '/api/list',

        parse: function (response, options) {
            return response;
        }
    });

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    // Views
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    var clsHandler = Backbone.View.extend({
        data: null,
        layoutName: '',

        render: function() {
            if (this.template) {
                this.$el.html(Env.render(this.template,this.data));
                Backbone.$('#' + this.layoutName).html(this.$el);
            }

            return this;
        }
    });

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    var clsSearchView = clsHandler.extend({
        template: 'search/index.html',
        layoutName: 'note-layout-search',
        filterStr: '',

        //-------------
        events: {
            'click #option_pages':  'event_in_pages',
            'click #option_list':   'event_in_list',
            'click #note-btn-add':  'event_btn_add',
            'keyup #note-in-search': 'event_key_in_search'
        },        

        initialize: function(options) {
            if (eventModel) this.data = { data: eventModel.attributes};
        },

        render: function () {
            clsHandler.prototype.render.call(this);
        },

        //-------------
        event_in_pages: function(e) {
            eventModel.set('page_view',true);
        },

        event_in_list: function(e) {
            eventModel.set('page_view',false);
        },

        event_btn_add: function(e) {
            if (e && e.prevetDefault) e.prevetDefault();
            route.navigate('!/item/0', {trigger: true});
        },

        event_key_in_search: function(e) {
            if (e && e.prevetDefault) e.prevetDefault();
            if (e.keyCode == 13) {  // enter
                this.filterStr = this.$el.find('#note-in-search').val();
                eventModel.set('search',this.filterStr);
            }
        }
    });

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    var clsCollectionView = clsHandler.extend({
        template: 'list/index.html',
        layoutName: 'note-layout-list',

        scrollMargin: 10,
        scrollLoading: false,

        page_view: true,

        collection: null,

        //-------------
        events: {
            'click #note-btn-edit': 'event_btn_edit'
            //'scroll': 'event_scroll'
        },        

        //-------------
        initialize: function(options) {
            this.listenTo(eventModel,'change:page_view',this.event_change_page_view);
            this.event_change_page_view();
        },

        constructor: function(collection, options) {
            this.collection = collection;
            this.listenTo(this.collection, 'sync', this.render.bind(this)); 

            clsHandler.apply(this, [options]);
        },

        render: function () {
            var page_numb   = parseInt(eventModel.get("page_numb"));
            var notesInPage = parseInt(eventModel.get('notes_in_page'));
            var notesCount  = parseInt(eventModel.get('notes_count'));

            if (eventModel.get('page_view')) { // с пагинатором
                var beginRecord = page_numb*notesInPage - notesInPage + 1;
                var endRecord =  beginRecord + notesInPage;

                if (endRecord > notesCount) endRecord = notesCount;

                this.data = {
                    list: {
                        'models': this.collection.slice(beginRecord,endRecord)
                    }
                };
            } else {
                this.data = {
                    list: {
                        'models': this.collection.slice(1,Math.min(page_numb*notesInPage+1,notesCount))
                    }
                }
            }

            clsHandler.prototype.render.call(this);
            this.event_change_page_view();
        },

        appendScrollable: function() {
            eventModel.set("page_numb",eventModel.get("page_numb")+1);
            route.createUrl();
            this.render();

            this.scrollLoading = false;
        },

        //-------------
        event_change_page_view: function() {
            this.page_view = eventModel.get("page_view");

            if (this.page_view) {
                $(window).unbind( "scroll" );
            } else {
                $(window).scroll(this.event_scroll.bind(this));
            }
        },

        event_scroll: function() {
            if (this.scrollLoading) return;

            var scrollable = $('#note-layout-list');
            var windowObj =  $(window);

            if (windowObj.height() + windowObj.scrollTop() - scrollable.offset().top + this.scrollMargin > scrollable.outerHeight()) {
                this.scrollLoading = true;
                this.appendScrollable(scrollable);
            }
        },

        event_btn_edit: function(e) {
            if (e && e.prevetDefault) e.prevetDefault();
            route.navigate('!/item/' + e.currentTarget.dataset.id, {trigger: true});
        }
    });

    //*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    var clsFooter = clsHandler.extend({
        template: 'footer/index.html',
        layoutName: 'note-layout-footer',

        initialize: function() {
            this.calculation();
        },

        remove: function () {
            clsHandler.prototype.remove.call(this);
            eventModel.set('page_numb',1);
        },

        calculation: function() {
            var notesCount  = eventModel.get('notes_count');
            var notesInPage = eventModel.get('notes_in_page');
            var notesRest   = notesCount % notesInPage;
            var notesPages  = (notesCount - notesRest)/notesInPage;
            var page_numb   = eventModel.get('page_numb');

            if (notesRest != 0) notesPages++;

            var pages = new Array();

            var previousPage = '';
            var nextPage = '';

            for (var i=1; i<= notesPages; i++) {                
                pages.push({
                    num: i,
                    url: route.createUrlPage(i)
                });
            };

            this.data = {
                count: notesPages,
                pages: pages,
                page_numb: eventModel.get('page_numb'),
                previousPage: route.createUrlPage(Math.max(page_numb-1,1)),
                nextPage: route.createUrlPage(Math.min(page_numb+1,notesPages))
            };
        }
    });

    //*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    var clsListView = clsHandler.extend({
        template: 'main/index.html',
        layoutName: 'note-layout-main',

        collectionNotes: new clsNotesCollection(),

        page_view: true,

        viewSearch: null,
        viewList:   null,
        viewFooter: null,

        initialize: function(options) {
            this.listenTo(eventModel,'change:search',this.changeFilter.bind(this));
            this.listenTo(eventModel,'change:page_view',this.changeTypeView);

            this.listenTo(this.collectionNotes,'sync',this.collectionNotesSuccess);
            this.listenTo(this.collectionNotes,'error',this.collectionNotesError);

            this.page_view = eventModel.get('page_view');
            this.changeTypeView();
        },

        render: function () {
            clsHandler.prototype.render.call(this);

            this.viewSearch =  new clsSearchView();
            this.viewSearch.render();

            if (eventModel.get('search')) {
                this.collectionNotes.fetch({data: {query: eventModel.get('search')}});
            }
            else {
                this.collectionNotes.fetch();
            }
        },

        changeTypeView: function() {
            this.page_view = eventModel.get('page_view');
            if (this.page_view) {
                this.viewFooter = new clsFooter();
                this.viewFooter.render();

            } else {
                if (this.viewFooter) this.viewFooter.remove();
            }

            if (this.viewList) this.viewList.render();
            route.createUrl();
        },

        changeFilter: function() {
            this.collectionNotes.fetch({data: {query: eventModel.get('search')}});
            eventModel.set('page_numb', 1);
        },

        collectionNotesSuccess: function(response) {
            eventModel.set('notes_count', this.collectionNotes.length);
            route.createUrl();

            this.viewList = new clsCollectionView(this.collectionNotes);
            this.viewList.render();

            if (this.page_view) {
                this.viewFooter = new clsFooter();
                this.viewFooter.render();
            } else {
                if (this.viewFooter) this.viewFooter.remove();
            }
        },

        collectionNotesError: function(response) {
            console.log('collectionError', response);
        }
    });

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    // clsItemView
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    var clsItemView = clsHandler.extend({
        template: 'item/index.html',
        layoutName: 'note-layout-main',
        model: null,

        //-------------
        events: {
              'click #note-btn-remove': 'event_btn_remove',
              'click #note-btn-save': 'event_btn_save'
        },        

        //-------------
        constructor: function(model, options) {
            this.model = model;
            clsHandler.apply(this, [options]);
        },

        initialize: function() {
            this.data = {
                item: this.model,
                single: true
            };
        },

        //-------------
        event_btn_remove: function(e) {
            if (e && e.prevetDefault) {
                e.prevetDefault();
            }
            this.model.destroy()
                .done(json =>  {
                    if (json.success == true) {
                        route.navigate('!/dashboard', {trigger: true});
                    }
                    else {
                        var errStr = '';

                        for (var err in json.response.errors) {
                            errStr = errStr + json.response.errors[err].message + '\n';
                        }

                        alert(errStr);
                    };
                });
        },

        event_btn_save: function(e) {
            if (e && e.prevetDefault) {
                e.prevetDefault();
            }

            var attrs = {
                title: this.$el.find('#note-title').val(),
                note: this.$el.find('#note-text').val(),
                mark: false
            };

            if (this.model.id != 0) {
                this.model.set(attrs);
            }
            else {
                this.model = new clsNoteModel(attrs);
            }

            if (this.model.isValid()) {
                this.model.save()
                    .done(json =>  {
                        if (json.success == true) {
                            route.navigate('!/dashboard', {trigger: true});
                            this.remove();
                        }
                        else {
                            var errStr = '';

                            console.log(json.response);

                            for (var err in json.response.errors) {
                                errStr = errStr + json.response.errors[err].message + '\n';
                            }

                            alert(errStr);
                        };
                    });
            }
            else {
                alert(this.model.validationError);
            };
        },   
    });

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    // Body
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    var clsRootRouter = Backbone.Router.extend({
        routes: {
          '!/dashboard':            'list',
          '!/dashboard/:paramsStr': 'query',
          '!/item/:id':             'item',
        },

        //-------------
        query: function(paramsStr) {
            eventModel.off("change");

            _.each(this.parseQueryString(paramsStr), function(item, index){
                switch(index) {
                    case 'page_view':
                        if (item == 'true')  {
                            eventModel.set(index,true); 
                        } else {
                            eventModel.set(index,false);   
                        }

                        break;
                    case 'page_numb':
                        eventModel.set(index,parseInt(item));

                        break;
                    default:
                        eventModel.set(index,item);
                }
            }); 

            var view = new clsListView({refresh: false});
            view.render();
        },

        list: function() {
            var view = new clsListView();
            view.render();
        },

        item: function(id) {
            var model = new clsNoteModel({_id: id});

            model
                .fetch()
                .then(function(){
                    var view = new clsItemView(model);
                    view.render();
                })
                .catch(function(err){
                    console.log(err);
                });
        },

        //-------------
        createUrl: function() {
            var resultUrl = '';

            _.each(eventModel.attributes, function(item, index){
                resultUrl += '&' + index + '=' + item;
            });

            resultUrl = '!/dashboard/' + resultUrl.substr(1,resultUrl.length);

            this.navigate(resultUrl);
        },

        createUrlPage: function(page) {
            var resultUrl = '';

            _.each(eventModel.attributes, function(item, index){
                if (index == 'page_numb') {
                    resultUrl += '&' + index + '=' + page;
                } else {
                    resultUrl += '&' + index + '=' + item;
                }
            });

            resultUrl = '#!/dashboard/' + resultUrl.substr(1,resultUrl.length);

            return resultUrl;
        },

        parseQueryString: function(paramsStr) {
            if (!_.isString(paramsStr)) return;

            var params = {};
            var paramsParts = decodeURI(paramsStr).split(/&/g);
             _.each(paramsParts, function(val) {
                var parts = val.split('=');
                if (parts.length >= 1) {
                    var val = undefined;
                    if (parts.length == 2) val = parts[1];
                    params[parts[0]] = val;
                }
            });

            return params;
        }        
    });


    var eventModel = new clsEventModel();
    var route = new clsRootRouter();

    Backbone.history.start();

    setTimeout(function(){
        if (window.location.hash == '') {
            window.location.hash = '!/dashboard';
        }
    });

    /*~~~ END ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
});