module.exports = {
    name: 'healer',
    run: function(creep) {
        // Assign next Action
        if( creep.action == null || ['guarding','idle'].includes(creep.action.name)) {
            this.nextAction(creep);
        }
        // Do some work
        if( creep.action && creep.target ) {
            creep.action.step(creep);
        } else {
            logError('Creep without action/activity!\nCreep: ' + creep.name + '\ndata: ' + JSON.stringify(creep.data));
        }
    },
    nextAction: function(creep){ 
        let priority = [
            Creep.action.healing, 
            Creep.action.guarding, 
            Creep.action.idle
        ];
        let oldActionName = creep.action.name;
        for(var iAction = 0; iAction < priority.length; iAction++) {
            var action = priority[iAction];
            if(action.isValidAction(creep) && 
                action.isAddableAction(creep) && 
                action.assign(creep)) {
                    if( oldActionName != action.name ) {
                        creep.data.moveMode = null;
                        delete creep.data.path;
                    }
                    return;
            }
        }
    }
}