using AventStack.ExtentReports;
using NUnit.Framework;
using DemoBlaze.Auto.WebPages;
using System.Threading;

namespace DemoBlaze.Auto.Template.Tests


{
    [TestFixture]
    class BlazeTests: TestSetCleanBase
    {
        [TestCase]

        public void PurchaseE2ETest()
        {
            blazeHomePage = new BlazeHomePage(setUpWebDriver);
            loginPage = new LoginPage(setUpWebDriver);
            itemPage = new ItemPage(setUpWebDriver);
            cartPage = new CartPage(setUpWebDriver);


            test.Log(Status.Debug, "Entra en la web de blaze."); 
            blazeHomePage.ClickLogin();
            test.Log(Status.Info, "Hace click");
            loginPage.FillAndSubmitLogin();
            blazeHomePage.WaitNameOfUser();            
            blazeHomePage.ClickCategoryAndItem("Laptops", "MacBook Pro");
            itemPage.NameAssert();
            itemPage.ClickAddToCart();

            itemPage.ClickCartLink();
            cartPage.WaitWebTitle();
            cartPage.ProductPriceAssert();
            cartPage.PlaceOrderClick();
            cartPage.PurchaseFillAndSubmit();
            cartPage.WaitSuccessModal();
            cartPage.ClickOkButton();            

            test.Log(Status.Pass, "Fin del test.");
        }

        [TestCase]
        public void PurchaseTestDelete()
        {
            blazeHomePage = new BlazeHomePage(setUpWebDriver);
            loginPage = new LoginPage(setUpWebDriver);
            itemPage = new ItemPage(setUpWebDriver);
            cartPage = new CartPage(setUpWebDriver);

            blazeHomePage.ClickLogin();
            test.Log(Status.Info, "Hace click");
            loginPage.FillAndSubmitLogin();
            blazeHomePage.WaitNameOfUser();
            blazeHomePage.ClickCategoryAndItem("Phones", "Samsung galaxy s6");
            itemPage.AssertPhone();
            itemPage.ClickAddToCart();
            itemPage.HomePage();
            blazeHomePage.WaitHomePage();
            blazeHomePage.ClickCategoryAndItem("Monitors", "ASUS Full HD");
            itemPage.AssertMonitor();
            itemPage.ClickAddToCart();
            itemPage.ClickCartLink();
            cartPage.WaitWebTitle();
            cartPage.AssertItemsInChart("Samsung galaxy s6", "ASUS Full HD");
            cartPage.DeleteMyItem("Samsung galaxy s6");
            //itemPage.ClickCartLink();
            //cartPage.WaitWebTitle();
            //cartPage.PlaceOrderClick();
            //cartPage.PurchaseFillAndSubmit();
            //cartPage.WaitSuccessModal();
            //cartPage.ClickOkButton();
        }
    }   
}
