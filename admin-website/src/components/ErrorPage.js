import { Component } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { OrangeOutlineButton, OrangeButton } from "./UI/Button";
import Panel from "./UI/Panel";
import WalletProviderSelector from "./WalletProviderSelector";

const walletError = css`
  margin: "auto";
  width: "70%";
  text-align: "center";
  align-items: "middle";
  padding: "10px";
`;

class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.refreshPage = this.refreshPage.bind(this);
    this.toggleWalletProviderSelector = this.toggleWalletProviderSelector.bind(
      this
    );

    this.state = {
      showWalletProviderSelector: false
    };
  }

  // eslint-disable-next-line class-methods-use-this
  refreshPage() {
    window.location.reload();
  }

  toggleWalletProviderSelector() {
    this.setState({
      showWalletProviderSelector: !this.state.showWalletProviderSelector
    });
  }

  render() {
    const { showWalletProviderSelector } = this.state;
    return (
      <Panel style={{ textAlign: "center" }}>
        <div css={css(walletError)}>
          <img
            src={"../../static/images/wallet-error.svg"}
            style={{ width: "165px" }}
          />
          <h1>Admin wallet address not found.</h1>
          {!showWalletProviderSelector ? (
            <div>
              <p>
                Please click{" "}
                <a href="https://docs.opencerts.io/appendix_test_accounts.html">
                  here
                </a>{" "}
                and follow the instructions to install a test wallet.
              </p>
              <OrangeButton
                variant="pill"
                onClick={this.toggleWalletProviderSelector}
                className="danger"
              >
                Change Wallet Provider
              </OrangeButton>
              <OrangeOutlineButton variant="pill" onClick={this.refreshPage}>
                Retry
              </OrangeOutlineButton>
            </div>
          ) : (
            <div>
              <p>Select another wallet provider.</p>
              <WalletProviderSelector />
            </div>
          )}
        </div>
      </Panel>
    );
  }
}

export default ErrorPage;

ErrorPage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  rest: PropTypes.object
};
