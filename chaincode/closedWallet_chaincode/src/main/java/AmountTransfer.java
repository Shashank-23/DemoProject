import com.owlike.genson.Genson;
import org.hyperledger.fabric.contract.Context;
import org.hyperledger.fabric.contract.ContractInterface;
import org.hyperledger.fabric.contract.annotation.Contract;
import org.hyperledger.fabric.contract.annotation.Default;
import org.hyperledger.fabric.contract.annotation.Info;
import org.hyperledger.fabric.contract.annotation.Transaction;
import org.hyperledger.fabric.shim.ChaincodeException;
import org.hyperledger.fabric.shim.ChaincodeStub;

@Contract(
        name = "basic",
        info = @Info(
                title = "Deposit and spend transactions",
                description = "A sample to facilitate deposit and spend transactions",
                version = "0.0.1-SNAPSHOT"))

@Default
public final class AmountTransfer implements ContractInterface {

    private final Genson genson = new Genson();
    private enum TrxnErrors {
        NOT_SUFFICIENT_BALANCE
    }

    @Transaction()
    public void initLedger(final Context ctx) {
        ChaincodeStub stub= ctx.getStub();
        TxnDetails txnDetails = new TxnDetails("1", "Deposit","InitializeBank","100000","100000");
        String txnState = genson.serialize(txnDetails);
        stub.putStringState("1", txnState);
    }

    @Transaction()
    public TxnDetails newTrxn(final Context ctx, final String txnid, final String txnSource,
                           final String txnAmount, final String sourceBalance) {
        ChaincodeStub stub = ctx.getStub();

        String txnCategory = null;

        switch(txnSource){
            case "Bank":
                txnCategory = "Bank";
            case "Wallet":
                txnCategory = "Wallet";
            case "RAPDRP":
                txnCategory = "RAPDRP";
            case "NON_RAPDRP":
                txnCategory = "NON_RAPDRP";
            default:
                System.out.println("Invalid Source of transaction");

        }

        if(Integer.parseInt(sourceBalance) < Integer.parseInt(txnAmount)){
            System.out.println("Balance is not sufficient for the transaction to proceed");
            throw new ChaincodeException("Balance is not sufficient for the transaction to proceed", TrxnErrors.NOT_SUFFICIENT_BALANCE.toString());
        }

        else{
            String updatedSrcBalance = String.valueOf(Integer.parseInt(sourceBalance) - Integer.parseInt(txnAmount));

                    TxnDetails txnDetails  = new TxnDetails(txnid, txnSource, txnAmount, txnCategory, updatedSrcBalance);
            String txnState = genson.serialize(txnDetails);
            stub.putStringState(txnid, txnState);
            return txnDetails;
        }

    }

}
