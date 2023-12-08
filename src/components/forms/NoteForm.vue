<script setup lang="ts">

</script>
<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Nouvelle note</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label for="note-title" class="col-form-label">Titre:</label>
                        <input type="text" class="form-control" id="note-title">
                    </div>
                    <div class="mb-3">
                        <label for="content-text" class="col-form-label">Contenu</label>
                        <textarea class="form-control" id="content-text"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="question-text" class="col-form-label">Question</label>
                        <textarea class="form-control" id="question-text"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="note-title" class="col-form-label">Tags:</label>
                        <input type="text" class="form-control" id="note-title">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Send message</button>
            </div>
        </div>
  </div>
</template>
<style>

</style>