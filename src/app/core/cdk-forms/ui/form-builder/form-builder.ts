import { Component, computed, signal } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDragPlaceholder,
  CdkDropList,
  moveItemInArray
} from '@angular/cdk/drag-drop';
import { FormElement, FormElementTemplate, FormElementType } from '../../model/cdk-forms-model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-form-builder',
  imports: [
    CdkDragHandle,
    CdkDrag,
    CdkDropList,
    CdkDragPlaceholder,
    JsonPipe
  ],
  templateUrl: './form-builder.html',
})
export class FormBuilder {
  protected readonly availableElements = signal<FormElementTemplate[]>([
    { type: 'text', icon: 'short_text', label: 'Text Input', defaultLabel: 'Text Field' },
    { type: 'email', icon: 'email', label: 'Email Input', defaultLabel: 'Email Field' },
    { type: 'number', icon: 'numbers', label: 'Number Input', defaultLabel: 'Number Field' },
    { type: 'textarea', icon: 'notes', label: 'Text Area', defaultLabel: 'Text Area' },
    { type: 'select', icon: 'list', label: 'Dropdown', defaultLabel: 'Select Option' },
    { type: 'checkbox', icon: 'check_box', label: 'Checkbox', defaultLabel: 'Checkbox' },
    { type: 'radio', icon: 'radio_button_checked', label: 'Radio Group', defaultLabel: 'Radio Options' },
    { type: 'date', icon: 'calendar_today', label: 'Date Picker', defaultLabel: 'Date' }
  ]);

  protected readonly formElements = signal<FormElement[]>([]);
  protected readonly selectedElementId = signal<string | null>(null);

  protected readonly selectedElement = computed(() => {
    const elementId = this.selectedElementId();
    return elementId ? this.formElements().find((el: { id: string; }) => el.id === elementId) || null : null;
  });

  protected readonly hasElements = computed(() => this.formElements().length > 0);
  protected readonly formJson = computed(() => JSON.stringify(this.formElements(), null, 2));

  protected drop(event: CdkDragDrop<FormElementTemplate[] | FormElement[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.formElements(), event.previousIndex, event.currentIndex);
      this.formElements.update((elements: any) => [...elements]);
    } else {
      const elementTemplate = event.previousContainer.data[event.previousIndex] as FormElementTemplate;
      this.addFormElement(elementTemplate, event.currentIndex);
    }
  }

  private addFormElement(template: FormElementTemplate, index: number) {
    const newElement: FormElement = {
      id: crypto.randomUUID(),
      type: template.type,
      label: template.defaultLabel,
      required: false,
      options: this.getDefaultOptions(template.type)
    };

    this.formElements.update((elements: any) => {
      const updated = [...elements];
      updated.splice(index, 0, newElement);
      return updated;
    });

    this.selectedElementId.set(newElement.id);
  }

  private getDefaultOptions(type: FormElementType): string[] | undefined {
    switch (type) {
      case 'select':
      case 'radio':
        return ['Option 1', 'Option 2'];
      default:
        return undefined;
    }
  }

  protected selectElement(element: FormElement) {
    this.selectedElementId.set(element.id);
  }

  protected deleteElement(elementId: string) {
    this.formElements.update((elements: any[]) => elements.filter(el => el.id !== elementId));

    if (this.selectedElementId() === elementId) {
      this.selectedElementId.set(null);
    }
  }

  protected updateElementOption(elementId: string, optionIndex: number, newValue: string) {
    const element = this.formElements().find((el: { id: string; }) => el.id === elementId);

    if (element && (element.type === 'select' || element.type === 'radio')) {
      if (element.options) {
        const newOptions = [...element.options];
        newOptions[optionIndex] = newValue;
        this.updateElement(elementId, 'options', newOptions);
      }
    }
  }

  protected updateElement<T extends keyof FormElement>(elementId: string, key: T, value: FormElement[T]) {
    // @ts-ignore
    this.formElements.update((elements: any[]) =>
      elements.map((el: { id: string; }) =>
        el.id === elementId ? { ...el, [key]: value } : el
      )
    );
  }

  protected addOption(elementId: string) {
    const element = this.formElements().find((el: { id: string; }) => el.id === elementId);
    if (element?.options) {
      const newOption = `Option ${element.options.length + 1}`;
      this.updateElement(elementId, 'options', [...element.options, newOption]);
    }
  }

  protected removeOption(elementId: string, optionIndex: number) {
    const element = this.formElements().find((el: { id: string; }) => el.id === elementId);
    if (element?.options && element.options.length > 1) {
      const updatedOptions = element.options.filter((_: any, index: number) => index !== optionIndex);
      this.updateElement(elementId, 'options', updatedOptions);
    }
  }

  protected previewForm() {
    console.log('Form Data:', this.formElements());
  }

  protected clearForm() {
    this.formElements.set([]);
    this.selectedElementId.set(null);
  }

}
