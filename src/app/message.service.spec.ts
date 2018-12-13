import { MessageService } from './message.service';

// !Isolated Unit test cases
describe('Test case for Message Services', () => {

    let messageService: MessageService;

    // beforeEach() func make sures we get new instance of messageSerivce, for each it block(each test cases)
    beforeEach(() => {
        messageService = new MessageService();
    });

    it('should have no data/list value in messages array', () => {
        expect(messageService.messages.length).toBe(0);
    });
    it('should add a message in messages array when add() func is invoked', () => {
        messageService.add('Tejas');
        expect(messageService.messages.length).toBe(1);
    });

    it('should clear data/list in messages array when clear() func is invoked', () => {
        messageService.add('Tejas');
        messageService.add('Usha');
        messageService.add('Shailesh');
        messageService.clear();
        expect(messageService.messages.length).toBe(0);
    });

});

