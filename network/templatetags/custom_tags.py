from django.template.defaulttags import register

...
@register.filter
def get_item(dictionary, key):
    return dictionary.get(f"{key}")

@register.filter
def reverse(list):
    return reverse(list)
