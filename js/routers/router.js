  var Workspace = Backbone.Router.extend({
    routes:{
      '*filter': 'setFilter'
    },

    setFilter: function( param ) {
      if (param) {
        param = param.trim();
      }
      app.PlaylistFilter = param || '';

      app.Playlist.trigger('filter');
    }
  });

  app.PlaylistRouter = new Workspace();
  Backbone.history.start();