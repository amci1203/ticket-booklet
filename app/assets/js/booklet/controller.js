import './service';

const dependencies = ['booklet-service'];

(app => {
    
    app.controller('Booklet', function (Booklet, $q, tickets, locations) {
        
        const main = this;
        
        const
            defaultNumTickets = 20,
            defaultDate = new Date('20170516');
        
        main.state = {
            printView: true,
        };
        
        main.cfg = {
            
            ticket: tickets[0],
            location: locations[0],
            numTickets: defaultNumTickets,
            issued: defaultDate
            
        };
        
        main.locations = locations;
        main.tickets   = tickets;
        main.range     = generateRange(defaultNumTickets);
        
        main.getTicket = () => main.ticketURL = `assets/img/tickets/${main.cfg.ticket}.png`;
        main.generateTicketNumber = i => `${main.cfg.location.substring(0,3).toUpperCase()}00${String(i).padStart(2, '0')}`;
        
        
        main.printTickets = () => {
            if (!main.cfg.ticket || !main.cfg.location) return false
            main.range = generateRange(main.cfg.numTickets);
            main.state.printView = true;
        };
        
        main.goBack = () => main.state.printView = false;
        
        
        // INIT
        main.getTicket();
        
        // FUNCTIONS
        
        function generateRange (n) {
            const arr = [], max = n + 1;
            for (let i = 1; i < max; i++) arr.push(i);
            return arr;
        }
    })
    
})(angular.module('booklet-controller', dependencies))