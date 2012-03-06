
class User extends Backbone.Model
	idAttribute: "_id"
	validation: 
		firstname:
			required: true
			msg: 'A first name is required'
		lastname:
			required: true
			msg: 'A last name is required'
		email:
			required: true
			pattern: 'email'
			msg: 'A valid email address is required'
		# startdate:
		# 	fn: (value, attr, computedState) ->
		# 		return '' if not value
		# 		pattern = ///
		# 			^([1-9]|0[1-9]|[12][0-9]|3[01])\D([1-9]|0[1-9]|1[012])\D(19[0-9][0-9]|20[0-9][0-9])$
		# 		///
		# 		x=value.match pattern
		# 		return '' if x
		# 		'Invalid date'		 
		# 		# d=Date.parse(value)
		# 		# if (isNaN(d)==false)
		# 		# 	d=new Date(d);
		# 		# 	return ''					
				    
	
	initialize: ->				
		@on 'validated', (isValid, model, attrs) ->
			console.log 'OnValidated event isValid: ' + isValid
			console.log '-------------------------'
			console.log "firstname: " + model.get("firstname")
			console.log "lastname: " + model.get("lastname")
			console.log "email: " + model.get("email")
			console.log "attrs: " + attrs
			console.log '-------------------------'

			# $(@).qtip("destroy") if $(@).data("qtip") 
			# if(!isValid)
			$(':not(.invalid)').qtip('destroy')

			$('.invalid')
				.qtip(
					overwrite: false
					content: 
						text: (api) ->
         			$(this).attr('data-error')
					position: 
					   my: 'left center'
					   at: 'right center'
					   viewport: $(window)
					show: 
						event: false
						ready: true
					hide: false
					style: 
					   classes: 'ui-tooltip-jtools' # ui-tooltip-red ui-tooltip-rounded ui-tooltip-shadow
			)


@app = window.app ? new Backbone.Marionette.Application()
@app.User = User 