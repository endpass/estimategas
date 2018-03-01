<template>
  <div class="faq section">
    <div class="container">
      <h1 class="title">FAQ</h1>

      <h3 class="faq-question">What is the difference between gas price and gas limit?</h3>
      <p>
      <strong>gas limit</strong> is the maximum amount of gas you allow your
      transaction to use. <strong>gas price</strong> represents the amount in
      ETH you are willing to pay for each unit of gas. The total transaction fee
      is calculated by multiplying the amount of gas used by the gas price.
      </p>

      <h3 class="faq-question">What happens if I set the gas limit too high?</h3>
      <p>Any unused gas will be refunded to you.</p>

      <h3 class="faq-question">What happens if I set the gas limit too low?</h3>
      <p>The transaction will fail, and the gas spent will <strong>NOT</strong>
      be refunded. Therefore, it is usually better to err on the higher side
      when setting gas limit.</p>

      <h3 class="faq-question">Where does the gas price data come from?</h3>
      <p>
      We aggregate data from multiple sources to provide the most accurate
      gas price estimates. Thanks to <a target="_blank"
      	href="http://blockcypher.com">BlockCypher</a>, <a target="_blank"
      	href="http://ethgasstation.info">ETH Gas Station</a>, and <a target="_blank"
      	href="http://cryptocompare.com">CryptoCompare</a> for providing data.
      </p>
    </div>
	</div>
</template>

<style lang="scss">
.faq-question {
	font-size: 1.5rem;
	margin-top: 0.5rem;
}
</style>
