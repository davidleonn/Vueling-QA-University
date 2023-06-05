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
    public class CartPage : CommonPage
    {
        public CartPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {

        }       

        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        //Define WebElements by: Id, CssSelector or XPath

        protected By OptionsPanel
        {
            get { return By.Id("accordion"); }
        }

        protected IWebElement _OptionsPanel
        {
            get { return WebDriver.FindElement(OptionsPanel); }
        }

        private IWebElement BtnCheckout
        {
            get { return WebDriver.FindElementByXPath("//a[text()='Checkout']"); }
        }

        private IWebElement BtnRemoveItem(string itemName)
        {
            return WebDriver.FindElementByXPath("//table[@class='table table-bordered']//a[text()='" + itemName + "']/following::button[contains(@class, 'btn-danger')]");
        }
        
        private IWebElement EmptyCartText
        {
            get { return WebDriver.FindElementByXPath("//div[@id='content']//p[text()='Your shopping cart is empty!']"); }
        }

        private IWebElement BtnContinueHome
        {
            get { return WebDriver.FindElementByXPath("//a[text()='Continue']"); }
        }

        // Define functions and actions

        public CartPage WaitAndClickCheckout() 
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(OptionsPanel));
            BtnCheckout.Click();
            return this;            
        }

        public CartPage RemoveItemAndCheckout(string name)
        {            

            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(OptionsPanel));
            BtnRemoveItem(name).Click();           
            
            return this;
        }

        public CartPage AssertEmptyCartTextAndContinue()
        {
            string myText = EmptyCartText.Text;
            string text = "Your shopping cart is empty!";

            Assert.AreEqual(text, myText);
           BtnContinueHome.Click();

            return this;
        }
    }
}
