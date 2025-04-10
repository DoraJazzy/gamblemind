import React from "react";
import "../Styles/footer.css";

function Footer() { // Note: Component names should be PascalCase
    return (
        <footer className="app-footer">
            <div className="footer-content">
                <p>© {new Date().getFullYear()} GAMBLE-MINDED. All rights reserved.</p>
                {/* Add any additional footer elements here */}
            </div>
        </footer>
    );
}

export default Footer;