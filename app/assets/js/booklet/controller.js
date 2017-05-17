import './service';

const dependencies = ['booklet-service'];

(app => {
    
    app.controller('Booklet', function (Booklet, $q) {
        
        const main = this;
        
        const
            defaultNumTickets = 20,
            defaultDate = new Date('20170516');
        
        main.state = {
            printView: false,
        };
        
        Booklet.getLocations().then(data => main.locations = data);
        Booklet.getTicketNames().then(data => main.tickets = data);
        main.range     = null;
        
        main.getTicket = () => main.ticketURL = `assets/img/tickets/${main.cfg.ticket}.png`;
        main.generateTicketNumber = i => `${main.cfg.location.substring(0,3).toUpperCase()}0000${String(i).padStart(2, '0')}`;
        
        main.cfg = {
            
            ticket: null,
            location: null,
            numTickets: defaultNumTickets,
            issued: defaultDate
            
        };
        
        main.printTickets = () => {
            const arr = [], max = main.cfg.numTickets + 1;
            for (let i = 1; i < max; i++) {
                arr.push(i);
            }
            
            main.range = arr;
            main.state.printView = true;
        };
        
        main.goBack = () => main.state.printView = false;
        
    })
    
})(angular.module('booklet-controller', dependencies))