<script>
import { enhance } from "$app/forms";
import * as AlertDialog from "$lib/components/ui/alert-dialog/index";
import { Button, buttonVariants } from "$lib/components/ui/button/index";

export let open = false;
</script>

<AlertDialog.Root bind:open={open} closeOnOutsideClick={true}>
	<AlertDialog.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline">Upload Client File</Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<form method="post" action="/upload-test/?/ingestClient" enctype="multipart/form-data" use:enhance>
			<AlertDialog.Header>
				<AlertDialog.Title>
					Upload
				</AlertDialog.Title>
				<AlertDialog.Description>
					Here is a description.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<div class="grid grid-col-2 gap-4">
				<div class="">
					<label for="file"></label>
					<input type="file" name="file" id="file" />
				</div>
			</div>
			<AlertDialog.Footer>
				<AlertDialog.Action type="submit" class={buttonVariants({ variant: "primary" })}>Save</AlertDialog.Action>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>