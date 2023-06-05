using AventStack.ExtentReports;
using NUnit.Framework;
using Opencart.Auto;
using System.Threading;
using Opencart.Auto.Webpages.Base;
using OpenQA.Selenium;
using Opencart.Auto.Template.SetUp;
using Opencart.Auto.Template.Common;
using OpenQA.Selenium.Support.UI;
using System;

namespace Opencart.Auto.Template.WebPages
{
    public class ProductsPage : CommonPage
    {
        public ProductsPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {

        }
        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        //Define WebElements by: Id, CssSelector or XPath

        private IWebElement GetItemName(string itemName)
        
        {
            return WebDriver.FindElementByXPath("//h1[text()='" + itemName + "']");
        }

        private IWebElement BtnAddToCart
        {
            get { return WebDriver.FindElementById("button-cart"); }
        }

        private IWebElement ShoppingCartLink
        {
            get { return WebDriver.FindElementByXPath("//span[text()='Shopping Cart']"); }
        }

        private IWebElement InputQuantity
        {
            get { return WebDriver.FindElementById("input-quantity"); }
        }

        protected By SuccesMessageDisplay
        {
            get { return By.XPath("//div[@class='alert alert-success alert-dismissible']"); }
        }

        protected IWebElement _SuccesMessageDisplay
        {
            get { return WebDriver.FindElement(SuccesMessageDisplay); }
        }

        private IWebElement CamerasTab
        {
            get { return WebDriver.FindElementByXPath("//a[text()='Cameras']"); }
        }

        private IWebElement SelectCamera 
        {
            get { return WebDriver.FindElementByXPath("(//div[@class='product-thumb']//button[contains(., 'Add to Cart')])[2]"); }
        }
                
        // Define functions and actions

        public ProductsPage AssertMacBook(string name)
        {   
            string myPhone = GetItemName(name).Text;
            string itemName = "MacBook";

            Assert.AreEqual(itemName, myPhone);
            return this;
        }

        public ProductsPage AddAndGoToCart()
        {
            BtnAddToCart.Click();
            ShoppingCartLink.Click();

            return this;
        }
        
        public ProductsPage Add2MonitorsToCart()
        {
            InputQuantity.Clear();
            InputQuantity.SendKeys("2");
            BtnAddToCart.Click();
            return this;
        }

        public ProductsPage AssertMonitor(string name)
        {
            string myPhone = GetItemName(name).Text;
            string itemName = "Samsung SyncMaster 941BW";

            Assert.AreEqual(itemName, myPhone);
            return this;
        }

        public ProductsPage WaitSuccessMessageAndAddCamera()
        {

            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(SuccesMessageDisplay));

            CamerasTab.Click();
            SelectCamera.Click();
            ShoppingCartLink.Click();

            return this;
        }
    }

}
