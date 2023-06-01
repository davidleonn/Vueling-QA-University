using DemoBlaze.Auto.Template.Common;
using DemoBlaze.Auto.Template.SetUp;
using DemoBlaze.Auto.Webpages.Base;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections;

namespace DemoBlaze.Auto.WebPages
{
    public class ItemPage : CommonPage
    {
        //Constructor
        public ItemPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {

        }

        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();

        // Define WebElements by: Id, CssSelector or XPath

        private IWebElement ItemName
        {
            get { return WebDriver.FindElementByXPath("//h2[text()='MacBook Pro']"); }
        }

        private IWebElement AddToCartButton
        {
            get { return WebDriver.FindElementByXPath("//a[text()='Add to cart']"); }
        }

        private IWebElement TextCart
        {
            get { return WebDriver.FindElementByXPath("//a [text()= 'Cart'] "); }
        }
        private IWebElement SearchHome
        {
            get { return WebDriver.FindElementByXPath("//a [text()= 'Home '] "); }
        }
        private IWebElement PhoneName
        {
            get { return WebDriver.FindElementByXPath("//h2[text()='Samsung galaxy s6'] "); }
        }

        private IWebElement MonitorName
        {
            get { return WebDriver.FindElementByXPath("//h2[text()='ASUS Full HD'] "); }
        }

        // Define functions and actions           
                 
        public ItemPage AssertPhone()
        {
            string myPhone = "Samsung galaxy s6";
            Assert.AreEqual(myPhone, PhoneName.Text);
            return this;
        }

        public ItemPage AssertMonitor()
        {
            string myMonitor = "ASUS Full HD";
            Assert.AreEqual(myMonitor, MonitorName.Text);
            return this;
        }

        public ItemPage HomePage()
        {
            SearchHome.Click();
            return this;
        }

        public ItemPage NameAssert()
        {
            string laptopName = "MacBook Pro";                  
            Assert.AreEqual(laptopName, ItemName.Text);
            return this;
        }

        public ItemPage ClickAddToCart()
        {

            AddToCartButton.Click();
            WebDriverWait wait = new WebDriverWait(WebDriver, TimeSpan.FromSeconds(10));
            IAlert alert = wait.Until(ExpectedConditions.AlertIsPresent());
            alert.Accept(); ;
            return this;
        }

        public ItemPage ClickCartLink()
        {
            TextCart.Click();
            return this;
        }
    }
}
