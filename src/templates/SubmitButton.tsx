import {getSubmitButtonOptions, SubmitButtonProps} from "@rjsf/utils";
import {Button} from "@blueprintjs/core";

export const SubmitButton = (options : SubmitButtonProps) => {
    const { uiSchema } = options;
    const { norender, submitText, props } = getSubmitButtonOptions(uiSchema);
    return (
        <div>
            {!norender && (
                <Button type="submit" {...props}>
                    {submitText}
                </Button>
            )}
        </div>
    );
}