 var app = app || {};

  app.PlaylistView = Backbone.View.extend({

    tagName: 'li',

    template: _.template( $('#item-template').html() ),

    events: {
      'click .toggle': 'togglecompleted',
      'dblclick label': 'edit',
      'click .destroy': 'clear',           
      'keypress .edit': 'updateOnEnter',
      'blur .edit': 'close'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);        
      this.listenTo(this.model, 'visible', this.toggleVisible); 
    },

    render: function() {
      this.$el.html( this.template( this.model.attributes ) );

      this.$el.toggleClass( 'completed', this.model.get('completed') ); 
      this.toggleVisible();                                             
      this.$input = this.$('.edit');
      return this;
    },


    toggleVisible : function () {
      this.$el.toggleClass( 'hidden',  this.isHidden());
    },


    isHidden : function () {
      var isCompleted = this.model.get('completed');
      return ( // hidden cases only
        (!isCompleted && app.PlaylistFilter === 'completed')
        || (isCompleted && app.PlaylistFilter === 'active')
      );
    },

    edit: function() {
      this.$el.addClass('editing');
      this.$input.focus();
    },

    close: function() {
      var value = this.$input.val().trim();

      if ( value ) {
        this.model.save({ title: value });
      } else {
        this.clear(); // NEW
      }

      this.$el.removeClass('editing');
    },

    updateOnEnter: function( e ) {
      if ( e.which === ENTER_KEY ) {
        this.close();
      }
    },

    clear: function() {
      this.model.destroy();
    }
  });