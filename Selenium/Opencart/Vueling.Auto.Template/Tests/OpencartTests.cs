using AventStack.ExtentReports;
using NUnit.Framework;
using Opencart.Auto.Template.WebPages;
using Opencart.Auto.Template.WebPagess;
using System.Threading;

namespace Opencart.Auto.Template.Tests
{
    public class OpencartTests:TestSetCleanBase
    {
        [TestCase, Order(1)]        

        public void BuyMacBookE2ETest()
        {
            homePage = new HomePage(setUpWebDriver);
            registerPage = new RegisterPage(setUpWebDriver);
            accountPage = new AccountPage(setUpWebDriver);
            productsPage = new ProductsPage(setUpWebDriver);
            cartPage = new CartPage(setUpWebDriver);
            checkoutPage = new CheckoutPage(setUpWebDriver);
            allProductsTabPage = new AllProductsTabPage(setUpWebDriver);

            string itemName = "MacBook";
            
            homePage.SecurityPage();
            homePage.RegisterLink();           
            registerPage.WaitAndFillFormAndSubmit();
            accountPage.WaitPageClickHome();            
            homePage.ItemSelect(itemName);
            productsPage.AssertMacBook(itemName);
            productsPage.AddAndGoToCart();
            cartPage.WaitAndClickCheckout();
            checkoutPage.WaitCheckoutPage();
            checkoutPage.FillAndSubmitCheckoutForm();
            checkoutPage.CheckboxClick();
            checkoutPage.SubmitPaymentAndConfirm();
            homePage.WaitHomePage();
            homePage.AssertNoItemsInCart();

        }
        [TestCase, Order(2)]
        public void RemoveItemInCartAndBuyE2ETest()
        {
            homePage = new HomePage(setUpWebDriver);
            registerPage = new RegisterPage(setUpWebDriver);
            accountPage = new AccountPage(setUpWebDriver);
            productsPage = new ProductsPage(setUpWebDriver);
            cartPage = new CartPage(setUpWebDriver);
            checkoutPage = new CheckoutPage(setUpWebDriver);
            allProductsTabPage = new AllProductsTabPage(setUpWebDriver);

            string monitor = "Samsung SyncMaster 941BW";
            string camera = "Nikon D300";
            string itemName = "MacBook";

            homePage.SecurityPage();
            homePage.RegisterLink();
            registerPage.WaitAndFillFormAndSubmit();
            accountPage.WaitPageClickHome();
            homePage.WaitLogoutText();
            homePage.ComponentsTabNavigate();
            allProductsTabPage.WaitAndClickMonitors();
            allProductsTabPage.SelectMonitor(monitor);
            productsPage.AssertMonitor(monitor);
            productsPage.Add2MonitorsToCart();
            productsPage.WaitSuccessMessageAndAddCamera();
            cartPage.RemoveItemAndCheckout(camera);
            cartPage.RemoveItemAndCheckout(monitor);
            cartPage.AssertEmptyCartTextAndContinue();
            accountPage.WaitPageClickHome();
            homePage.ItemSelect(itemName);
            productsPage.AssertMacBook(itemName);
            productsPage.AddAndGoToCart();
            cartPage.WaitAndClickCheckout();
            checkoutPage.WaitCheckoutPage();
            checkoutPage.FillAndSubmitCheckoutForm();
            checkoutPage.CheckboxClick();
            checkoutPage.SubmitPaymentAndConfirm();
            homePage.WaitHomePage();
            homePage.AssertNoItemsInCart();

        }

        [TestCase, Order(3)]

        public void ContactUsE2ETest()
        {
            homePage = new HomePage(setUpWebDriver);
            registerPage = new RegisterPage(setUpWebDriver);
            accountPage = new AccountPage(setUpWebDriver);
            contactPage = new ContactPage(setUpWebDriver);

            homePage.SecurityPage();
            homePage.RegisterLink();
            registerPage.WaitAndFillFormAndSubmit();
            accountPage.WaitPageClickHome();
            homePage.WaitLogoutText();
            homePage.ContactUsNavigate();
            contactPage.WaitContactPage();
            contactPage.FillFormAndSubmit();
            homePage.AssertNoItemsInCart();
        }

        [TestCase, Order(4)]

        public void CheckSponsorTest()
        {
            homePage = new HomePage(setUpWebDriver);

            string sponsor = "Nintendo";

            homePage.SecurityPage();
            homePage.FindSponsor(sponsor);
        }
    }
}
