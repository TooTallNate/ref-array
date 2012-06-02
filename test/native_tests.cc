#include <stdlib.h>
#include "v8.h"
#include "node.h"

using namespace v8;
using namespace node;

namespace {

void Initialize(Handle<Object> target) {
  HandleScope scope;


}

} // anonymous namespace

NODE_MODULE(native_tests, Initialize);
