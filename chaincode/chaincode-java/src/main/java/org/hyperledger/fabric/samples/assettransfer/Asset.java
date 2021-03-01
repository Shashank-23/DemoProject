/*
 * SPDX-License-Identifier: Apache-2.0
 */

package org.hyperledger.fabric.samples.assettransfer;

import java.util.Objects;

import org.hyperledger.fabric.contract.annotation.DataType;
import org.hyperledger.fabric.contract.annotation.Property;

import com.owlike.genson.annotation.JsonProperty;

@DataType()
public final class TxnDetails {

    @Property()
    private final String trxnId;

    @Property()
    private final String category;

    @Property()
    private final int amount;

    @Property()
    private final String owner;

    public String getTrxnId() {
        return trxnId;
    }

    public String getCategory() {
        return category;
    }

    public int getAmount() {
        return amount;
    }

    public String getOwner() {
        return owner;
    }

    public Asset(@JsonProperty("trxnId") final String trxnId, @JsonProperty("category") final String category,
            @JsonProperty("amount") final int amount, @JsonProperty("owner") final String owner{
        this.trxnId = trxnId;
        this.category = category;
        this.amount = amount;
        this.owner = owner;
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

        return Objects.deepEquals(
                new String[] {getTrxnId(), getCategory(), getOwner()},
                new String[] {other.getTrxnId(), other.getCategory(), other.getOwner()})
                &&
                Objects.deepEquals(
                new int[] {getSize(), getAppraisedValue()},
                new int[] {other.getSize(), other.getAppraisedValue()});
    }

    @Override
    public int hashCode() {
        return Objects.hash(getTrxnId(), getCategory(), getSize(), getOwner(), getAppraisedValue());
    }

    @Override
    public String toString() {
        return this.getClass().getSimpleName() + "@" + Integer.toHexString(hashCode()) + " [assetID=" + assetID + ", color="
                + color + ", size=" + size + ", owner=" + owner + ", appraisedValue=" + appraisedValue + "]";
    }
}
