
# var jasmineEnv = jasmine.getEnv()
# jasmineEnv.addReporter(new jasmine.HtmlReporter)
# window.onload = function() {
#   jasmineEnv.execute()
# };
(->
    require.config 
        paths:
            jquery: "public/scripts/libs/jquery-1.7.1"
            jqueryUI: "public/scripts/libs/jquery-ui-1.8.18.custom.min"
            underscore: "public/scripts/libs/underscore"
            
            backbone: "public/scripts/libs/backbone"
            handlebars: "public/scripts/libs/handlebars"
            bootstrap: "public/scripts/libs/bootstrap/js/bootstrap"
            marionette: "public/scripts/libs/backbone.marionette"
            modelbinder: "public/scripts/ibs/backbone.modelbinder"
            validation: "public/scripts/libs/backbone.validation"
            jqueryQtip: "public/scripts/libs/jquery.qtip"
            select2: "public/scripts/libs/select2"
            
            utils: "public/scripts/utils"
            admin_navigation: "public/scripts/templates/tmpl.admin.navigation"
            admin_layout: "public/scripts/templates/tmpl.admin.layout"
            employee_department_header: "public/scripts/templates/tmpl.employee.department.header"
            employee_list_empty: "public/scripts/templates/tmpl.employee.list.empty"
            employee_item: "public/scripts/templates/tmpl.employee.item"
            employee_maintenance: "public/scripts/templates/tmpl.employee.maintenance"
            employee_navigation: "public/scripts/templates/tmpl.employee.navigation"
            employee_layout: "public/scripts/templates/tmpl.employees.layout"
            employee_remove_modal: "public/scripts/templates/tmpl.employee.remove.modal"
            department_grid_header: "public/scripts/templates/tmpl.department.grid.header"
            department_item: "public/scripts/templates/tmpl.department.item"
            department_maintenance: "public/scripts/templates/tmpl.department.maintenance"
            department_navigation: "public/scripts/templates/tmpl.department.navigation"
            department_layout: "public/scripts/templates/tmpl.department.layout"
            
            shim:
                backbone:
                  deps:         ["underscore", "jquery"]
                  exports:      "Backbone"
                underscore:
                  exports: "_"    

                marionette:     ["backbone"]
                modelbinder:    ["backbone"]
                validation:     ["backbone"]
                jqueryUI:       ["jquery"]    
                jqueryQtip:     ["jquery"]    

            mocha: 
                init: ->
                    mocha.setup('bdd')
                    mocha

  require ["require", "jquery", "underscore", "backbone", "marionette", "handlebars", "modelbinder", "validation"], 
    (require) -> 
        mocha.setup "bdd"
        require ["tests/models/departmentTests", "tests/models/employeeTests"], () -> mocha.run()

).call this