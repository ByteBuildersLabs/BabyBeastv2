import { useAccount, } from "@starknet-react/core";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojoStore } from "../App";
import { useDojo } from "./useDojo";
import { v4 as uuidv4 } from "uuid";
import { Account } from "starknet";

export const useSystemCalls = () => {
    const { account } = useAccount();

    const state = useDojoStore((state) => state);
    const {
        setup: { client },
    } = useDojo();

    const generateEntityId = () => {
        return account?.address ? getEntityIdFromKeys([BigInt(account.address)]) : null;
    };

    const spawn = async () => {

        console.log(account);

        // Generate a unique entity ID
        const entityId = generateEntityId();
        console.log(entityId);

        // Generate a unique transaction ID
        const transactionId = uuidv4();

        // The value to update the Moves model with

        // Apply an optimistic update to the state
        // this uses immer drafts to update the state
        // state.applyOptimisticUpdate(transactionId, (draft) => {
        //     if (draft.entities[entityId]?.models?.dojo_starter?.Beast) {
        //         draft.entities[entityId].models.dojo_starter.Beast
        //     }
        // });

        try {
            // Execute the spawn action from the client
            if (account) {
                await client.actions.spawn(account as Account);
            } else {
                throw new Error("Account is undefined");
            }
            return true;

            // Wait for the entity to be updated with the new state
            // await state.waitForEntityChange(entityId, (entity) => {
            //     return !!entity?.models?.dojo_starter?.Beast;
            // });
        } catch (error) {
            // Revert the optimistic update if an error occurs
            state.revertOptimisticUpdate(transactionId);
            console.error("Error executing spawn:", error);
            return false
        } finally {
            // Confirm the transaction if successful
            state.confirmTransaction(transactionId);
        }
    };

    return {
        spawn,
    };
};
