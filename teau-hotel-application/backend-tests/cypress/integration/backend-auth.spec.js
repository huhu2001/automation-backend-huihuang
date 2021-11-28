
import * as roomHelpers from '../helpers/roomHelpers'

describe('testing rooms', function(){


    it('TC1: show all rooms', function(){
        roomHelpers.showAllrooms(cy)
    })

    it('TC2: Creat a new room', function(){
        roomHelpers.creatNewRoom(cy)
    })


    it('TC3:  change room', function(){
        roomHelpers.updateRandomRoom(cy)
    })
   
    it('TC4:  delete room', function(){
        roomHelpers.deleteRoom(cy)
    })

    it('TC5:  delete all rooms', function(){
        roomHelpers.deleteAllrooms(cy)
    })
})
