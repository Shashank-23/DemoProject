import com.owlike.genson.annotation.JsonProperty;
import org.hyperledger.fabric.contract.annotation.DataType;
import org.hyperledger.fabric.contract.annotation.Property;

import java.util.Objects;

@DataType()
public final class  TxnDetails {

    @Property()
    private final String txnId;

    @Property()
    private final String txnCategory;

    @Property()
    private final String txnSource;

    @Property()
    private final String txnAmount;

    @Property()
    private final String sourceBalance;

    public TxnDetails(@JsonProperty("txnId") final String txnId,
                      @JsonProperty("txnCategory") final String txnCategory,
                      @JsonProperty("txnSource") final String txnSource,
                      @JsonProperty("txnAmount") final String txnAmount,
                      @JsonProperty("sourceBalance") final String sourceBalance) {
        this.txnId = txnId;
        this.txnCategory = txnCategory;
        this.txnSource = txnSource;
        this.txnAmount = txnAmount;
        this.sourceBalance = sourceBalance;
    }

    public String getTxnId() {
        return txnId;
    }

    public String getTxnCategory() {
        return txnCategory;
    }

    public String getTxnSource() {
        return txnSource;
    }

    public String getTxnAmount() {
        return txnAmount;
    }

    public String getSourceBalance() {
        return sourceBalance;
    }

    @Override
    public boolean equals(final Object obj) {
        if (this == obj) {
            return true;
        }

        if ((obj == null) || (getClass() != obj.getClass())) {
            return false;
        }

        TxnDetails other = (TxnDetails) obj;

        return Objects.deepEquals(new String[] { getTxnId(), getTxnCategory(), getTxnSource(), getTxnAmount()},
                new String[] { other.getTxnId(), other.getTxnCategory(), other.getTxnSource(), other.getTxnAmount(), other.getSourceBalance()});
    }

    @Override
    public int hashCode() {
        return Objects.hash(getTxnId(), getTxnCategory(), getTxnSource(), getTxnAmount(), getSourceBalance());
    }

    @Override
    public String toString() {
        return this.getClass().getSimpleName() + "@" + Integer.toHexString(hashCode()) +
                " [txnId =" + txnId + ", txnCategory =" + txnCategory + ", txnSource=" + txnSource + ", txnAmount ="
                + txnAmount + ", sourceBalance =" + sourceBalance + "]";
    }

}
