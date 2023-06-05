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
    public class CheckoutPage : CommonPage
    {
        public CheckoutPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {

        }
        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        //Define WebElements by: Id, CssSelector or XPath

        protected By CheckoutTitlePage
        {
            get { return By.XPath("//h1[text()='Checkout']"); }
        }

        protected IWebElement _CheckoutTitlePage
        {
            get { return WebDriver.FindElement(CheckoutTitlePage); }
        }

        private IWebElement CheckoutInput(string inputId)
        {
            return WebDriver.FindElementById(inputId);
        }

        private IWebElement AddressSelect(int value)

        {
            return WebDriver.FindElementByXPath("//select/option[@value='" + value + "']");
        }


        private IWebElement BtnCheckout
        {
            get { return WebDriver.FindElementById("button-payment-address"); }
        }

        private IWebElement Checkbox
        {
            get { return WebDriver.FindElementByXPath("//input[@name='agree']"); }
        }

        private IWebElement BtnPaymentMethod
        {
            get { return WebDriver.FindElementById("button-payment-method"); }
        }
        private IWebElement BtnShipping
        {
            get { return WebDriver.FindElementById("button-shipping-address"); }
        }

        private IWebElement BtnConfirm
        {
            get { return WebDriver.FindElementById("button-confirm"); }
        }

        private IWebElement BtnContinue
        {
            get { return WebDriver.FindElementByXPath("//a[text()='Continue']"); }
        }

        protected By ConditionTerms
        {
            get { return By.XPath("//a[text()='Terms & Conditions']"); }
        }

        protected IWebElement _ConditionTerms
        {
            get { return WebDriver.FindElement(ConditionTerms); }
        }

        protected By BankTransferText
        {
            get { return By.XPath("//h2[text()='Bank Transfer Instructions']"); }
        }

        protected IWebElement _BankTransferText
        {
            get { return WebDriver.FindElement(BankTransferText); }
        }

        protected By OrderCheckoutText
        {
            get { return By.XPath("//h1[text()='Your order has been placed!']"); }
        }

        protected IWebElement _OrderCheckoutText
        {
            get { return WebDriver.FindElement(OrderCheckoutText); }
        }       

        // Define functions and actions

        public CheckoutPage WaitCheckoutPage()
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(CheckoutTitlePage));            
            return this;
        }

        public CheckoutPage FillAndSubmitCheckoutForm()
        {
            string randomString = Helpers.GetRandomString(5);

            CheckoutInput("input-payment-firstname").SendKeys(randomString);
            CheckoutInput("input-payment-lastname").SendKeys(randomString);
            CheckoutInput("input-payment-address-1").SendKeys(randomString);
            CheckoutInput("input-payment-city").SendKeys("Barcelona");
            AddressSelect(195).Click();
            AddressSelect(2979).Click();
            BtnCheckout.Click();
            return this;
        }

        public CheckoutPage CheckboxClick()
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(ConditionTerms));

            Jse2.ExecuteScript("arguments[0].click();", Checkbox);
            return this;
        }

        public CheckoutPage SubmitPaymentAndConfirm()
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(ConditionTerms));
            BtnPaymentMethod.Click();

            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(BankTransferText));
            BtnConfirm.Click();

            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(OrderCheckoutText));
            BtnContinue.Click();
            return this;
        }

        public CheckoutPage ShippingButtonClick()
        {
            BtnShipping.Click();
            return this;
        }
       
    }
}
