import { TccIotRestPage } from './app.po';

describe('tcc-iot-rest App', function() {
  let page: TccIotRestPage;

  beforeEach(() => {
    page = new TccIotRestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
