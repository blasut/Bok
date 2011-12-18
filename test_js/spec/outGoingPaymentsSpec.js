describe("OutGoingPayment", function() {

  beforeEach(function() {
    this.ogp = new OutGoingPayment({title: "Test title",
                                    date: "2011-12-16",
                                    price: 100
                                    });
  });
  
  it("gets created", function() {
    expect(this.ogp.get('title')).toEqual("Test title");
  });
});
