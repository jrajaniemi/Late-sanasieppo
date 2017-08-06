import { LatePage } from './app.po';

describe('late App', () => {
  let page: LatePage;

  beforeEach(() => {
    page = new LatePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
