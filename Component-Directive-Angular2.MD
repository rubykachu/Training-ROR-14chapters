#### 1. What is @Component decorator in Angular 2? What does @Component decorator do?
> \- @Component is the component metatdata. So that is the main responsibility, to provide metadata.
> \- The purpose of the metadata is to provide information for Angular to know what to do with the class
```
import { Component } from '@angular/core';
@Component({
  selector: 'my-component',
 template: 
    <div>Hello my name is {{name}}.
	    <button (click)="MyName()">Say my name</button>
    </div>
})

export class MyComponent {
  name: string;
  constructor() {
    this.name = 'Max'
  }
  MyName() {
   console.log('My name is', this.name)
  }
}
```
>When we use the <my-component></my-component> tag in our HTML, this component will be created, our constructor called, and rendered.
***Metadata Properties:***
* selector - css selector that identifies this component in a template
* styleUrls - list of urls to stylesheets to be applied to this component's view
* styles - inline-defined styles to be applied to this component's view
* template - inline-defined template for the view
* templateUrl - url to an external file containing a template for the view
* viewProviders - list of providers available to this component and its view children
* .v.v...
#### 2. What is @Directive decorator in Angular 2? What does @Directive decorator do?
> \- Marks a class as an Angular directive and collects directive configuration metadata.
> \- Directives add behaviour to an existing DOM element. 

```
import {Directive} from 'angular2/core'';
@Directive({
    selector: "[log-on-click]",
    hostListeners: {
        'click': 'onClick()'
    }
})
class LogOnClick {
    constructor() {}
    onClick() { console.log('Element clicked!'); }
}
<button log-on-click>I log when clicked!</button>
```
> **Metadata Properties:**
* exportAs - name under which the component instance is exported in a template
* host - map of class property to host element bindings for events, properties and attributes
* inputs - list of class property names to data-bind as component inputs
* outputs - list of class property names that expose output events that others can subscribe to
* providers - list of providers available to this component and its children
* queries - configure queries that can be injected into the component
* selector - css selector that identifies this component in a template
#### 3.Explain @Input decorator in Angular 2?
> \- @Input is a decorator to mark an input property
>  \- @Input is used to define an input property to achieve component property binding.
>  \- @Input can define alias for property names as @Input(alias)
#### 4. Explain @Output decorator in Angular 2?
> \- @Output is a decorator to mark an output property
> \- @Output is used to define output property to achieve custom event binding.
> \-  @Output can define alias for property names as @Output(alias)
#### 5. What is difference between component and directive in Angular 2?
> Components have their own view (HTML and styles). Directives are just "behavior" added to existing elements.
#### 6. Write an example for Two-way data binding in Angular 2?
**@Component**
```
import {Component} from '@angular/core';
import {EnterDirective} from "./sample.directive";

@Component({
    selector: 'sample-component',
    template: `
       <strong>Hello World</strong> form <strong>{{name}} Component</strong>!
       <br/>
       <input type="text" (enter)="enterHandler($event)" >
    `,
    directives: <any>[EnterDirective]
})
export class SampleComponent {
    name:string = 'Sample';

    enterHandler(event) {
        console.log(event);
    }
}
```
**@Directive**
```
import {Directive, Output} from "@angular/core";
import {EventEmitter} from "@angular/common/src/facade/async";

@Directive({
    selector: '[enter]',
    host: {
        '(keypress)': 'enterHandler($event)'
    }
})
export class EnterDirective {
    @Output() enter = new EventEmitter<any>();

    constructor() {
    }

    enterHandler(event) {
        if (event.keyCode == 13) {
            this.enter.emit(event);
        }
    }
}
```