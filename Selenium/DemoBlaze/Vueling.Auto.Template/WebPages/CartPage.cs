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
    public class CartPage : CommonPage
    {
        public CartPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {

        }
        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        //elements
        protected By WebTitle
        {
            get { return By.XPath("//h2[text()='Products']"); }
        }

        protected IWebElement _WebTitle
        {
            get { return WebDriver.FindElement(WebTitle); }
        }
        private IWebElement ProductPrice
        {
            get { return WebDriver.FindElementByXPath("//h3[text()='1100']"); }
        }

        private IWebElement PlaceOrderButton
        {
            get { return WebDriver.FindElementByXPath("//button[text()='Place Order']"); }
        }

        private IWebElement PlaceOrderName
        {
            get { return WebDriver.FindElementById("name"); }
        }
        private IWebElement PlaceOrderCountry
        {
            get { return WebDriver.FindElementById("country"); }
        }
        private IWebElement PlaceOrderCity
        {
            get { return WebDriver.FindElementById("city"); }
        }
        private IWebElement PlaceOrderCard
        {
            get { return WebDriver.FindElementById("card"); }
        }
        private IWebElement PlaceOrderMonth
        {
            get { return WebDriver.FindElementById("month"); }
        }
        private IWebElement PlaceOrderYear
        {
            get { return WebDriver.FindElementById("year"); }
        }
        private IWebElement PurchaseButton
        {
            get { return WebDriver.FindElementByXPath("//button[text()='Purchase']"); }
        }
        protected By PurchaseSuccessModal
        {
            get { return By.CssSelector(".sa-placeholder"); }
        }

        protected IWebElement _PurchaseSuccessModal
        {
            get { return WebDriver.FindElement(PurchaseSuccessModal); }
        }

        private IWebElement OkButton
        {
            get { return WebDriver.FindElementByXPath("//button[text()='OK']"); }
        }

        private IWebElement DeleteItem(String itemName)
        {
            return WebDriver.FindElementByXPath("//tr[@class='success']/td[text()='" + itemName + "']/../td/a");
        }

        private IWebElement getCartItem(String itemCartName) 
        {
            return WebDriver.FindElementByXPath("//td[text()='" + itemCartName + "']");
        }

        //functions

        public CartPage AssertItemsInChart(String name, String myMonitorName)
        {
            string myPhone = getCartItem(name).Text;
            string phoneName = "Samsung galaxy s6";
            string myMonitor = getCartItem(myMonitorName).Text;
            string monitorName = "ASUS Full HD";

            Assert.AreEqual(phoneName, myPhone );
            Assert.AreEqual(monitorName, myMonitor);
            return this;
        }

        public CartPage DeleteMyItem (String name)
        {
            DeleteItem(name).Click();
            return this;
        }

        public CartPage WaitWebTitle()
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(WebTitle));
            return this;
        }
        public CartPage ProductPriceAssert()
        {
            string price = ProductPrice.Text;
            string totalPrice = "1100";
            Assert.AreEqual(totalPrice, price);
            return this;
        }

        public CartPage PlaceOrderClick() 
        {
            PlaceOrderButton.Click();
            return this;
        }

        public CartPage PurchaseFillAndSubmit()
        {
            PlaceOrderName.SendKeys("david");
            PlaceOrderCountry.SendKeys("Spain");
            PlaceOrderCity.SendKeys("Barcelona");
            PlaceOrderCard.SendKeys("1");
            PlaceOrderMonth.SendKeys("June");
            PlaceOrderYear.SendKeys("2023");
            PurchaseButton.Click();
            return this;
        }

        public CartPage WaitSuccessModal()
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(PurchaseSuccessModal));
            return this;
        }

        public CartPage ClickOkButton() 
        { 
            OkButton.Click();
            return this;
        }

    }
}
